import Anthropic from "@anthropic-ai/sdk";
import { getSupabaseAdmin, getSupabaseServer } from "@/lib/supabase/server";
import { PLANS_CONFIG, type PlanName } from "@/lib/plans";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const supabaseAuth = await getSupabaseServer();
    const { data: { user } } = await supabaseAuth.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: "Non autorisé" }), { status: 401 });
    }

    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Messages requis" }), { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { data: userData } = await supabase.from("users").select("plan").eq("id", user.id).single();
    const planName = (userData?.plan || "SPARK") as PlanName;
    const plan = PLANS_CONFIG[planName];

    const today = new Date().toISOString().slice(0, 10);
    const { data: usage } = await supabase.from("usage").select("request_count, tokens_used").eq("user_id", user.id).eq("date", today).single();
    const dailyCount = usage?.request_count || 0;

    if (dailyCount >= plan.daily) {
      return new Response(JSON.stringify({ error: "Limite journalière atteinte", quota: { used: dailyCount, limit: plan.daily, plan: planName } }), { status: 429 });
    }

    const monthStart = today.slice(0, 7) + "-01";
    const { data: monthlyUsage } = await supabase.from("usage").select("request_count").eq("user_id", user.id).gte("date", monthStart);
    const monthlyTotal = (monthlyUsage || []).reduce((sum: number, row: { request_count: number }) => sum + row.request_count, 0);
    if (monthlyTotal >= plan.monthly) {
      return new Response(JSON.stringify({ error: "Limite mensuelle atteinte" }), { status: 429 });
    }

    await supabase.from("usage").upsert({ user_id: user.id, date: today, request_count: dailyCount + 1, tokens_used: usage?.tokens_used || 0 }, { onConflict: "user_id,date" });

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const stream = anthropic.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: plan.maxTokens,
      system: "Tu es AKASHA AI, l'assistant IA le plus puissant du marché. Tu parles en français, tu es concis, précis et expert. Tu peux parler de tous les sujets : code, design, business, créativité, analyse. Tu utilises des emojis avec parcimonie pour rendre tes réponses vivantes.",
      messages: messages.map((m: { role: string; content: string }) => ({ role: m.role as "user" | "assistant", content: m.content })),
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        stream.on("text", (text) => {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
        });
        stream.on("finalMessage", async (message) => {
          const totalTokens = message.usage?.output_tokens || 0;
          await supabase.from("usage").upsert({ user_id: user.id, date: today, request_count: dailyCount + 1, tokens_used: (usage?.tokens_used || 0) + totalTokens }, { onConflict: "user_id,date" });
          controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
          controller.close();
        });
        stream.on("error", (err) => {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: (err as Error).message })}\n\n`));
          controller.close();
        });
      },
    });

    return new Response(readable, { headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" } });
  } catch {
    return new Response(JSON.stringify({ error: "Erreur serveur" }), { status: 500 });
  }
}
