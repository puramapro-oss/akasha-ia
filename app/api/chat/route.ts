import Anthropic from "@anthropic-ai/sdk";
import { getSupabaseAdmin, getSupabaseServer } from "@/lib/supabase/server";
import { getPlanConfig } from "@/lib/plans";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const supabaseAuth = await getSupabaseServer();
    const { data: { user } } = await supabaseAuth.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: "Non autoris\u00e9" }), { status: 401 });
    }

    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Messages requis" }), { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { data: userData } = await supabase.from("users").select("plan").eq("id", user.id).single();
    const planKey = userData?.plan || "AUTOMATE_essentiel";
    const planCfg = getPlanConfig(planKey);
    const dailyLimit = planCfg?.tier.daily || 5;
    const monthlyLimit = planCfg?.tier.monthly || 100;
    const maxTokens = planCfg?.tier.maxTokens || 500;

    const today = new Date().toISOString().slice(0, 10);
    const { data: usage } = await supabase.from("usage").select("request_count, tokens_used").eq("user_id", user.id).eq("date", today).single();
    const dailyCount = usage?.request_count || 0;

    if (dailyCount >= dailyLimit) {
      return new Response(JSON.stringify({ error: "Limite journali\u00e8re atteinte", quota: { used: dailyCount, limit: dailyLimit, plan: planKey } }), { status: 429 });
    }

    const monthStart = today.slice(0, 7) + "-01";
    const { data: monthlyUsage } = await supabase.from("usage").select("request_count").eq("user_id", user.id).gte("date", monthStart);
    const monthlyTotal = (monthlyUsage || []).reduce((sum: number, row: { request_count: number }) => sum + row.request_count, 0);
    if (monthlyTotal >= monthlyLimit) {
      return new Response(JSON.stringify({ error: "Limite mensuelle atteinte" }), { status: 429 });
    }

    await supabase.from("usage").upsert({ user_id: user.id, date: today, request_count: dailyCount + 1, tokens_used: usage?.tokens_used || 0 }, { onConflict: "user_id,date" });

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const stream = anthropic.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: maxTokens,
      system: "Tu es AKASHA AI, l'assistant IA le plus puissant du march\u00e9. Tu parles en fran\u00e7ais, tu es concis, pr\u00e9cis et expert. Tu peux parler de tous les sujets : code, design, business, cr\u00e9ativit\u00e9, analyse.",
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
