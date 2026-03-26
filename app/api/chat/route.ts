import Anthropic from "@anthropic-ai/sdk";
import { getSupabaseAdmin, getSupabaseServer } from "@/lib/supabase/server";
import { getPlanConfig } from "@/lib/plans";

export const runtime = "nodejs";
export const maxDuration = 60;

const SYSTEM_PROMPT = "Tu es AKASHA AI, l'assistant IA le plus puissant du marché. Tu parles en français, tu es concis, précis et expert. Tu peux parler de tous les sujets : code, design, business, créativité, analyse.";

// OpenAI-compatible streaming (works for OpenAI, DeepSeek, Perplexity, Mistral)
async function streamOpenAICompatible(
  baseURL: string,
  apiKey: string,
  model: string,
  messages: { role: string; content: string }[],
  maxTokens: number,
) {
  const res = await fetch(`${baseURL}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      stream: true,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`API error ${res.status}: ${err}`);
  }

  return res.body;
}

// Google Gemini streaming
async function streamGemini(
  apiKey: string,
  model: string,
  messages: { role: string; content: string }[],
  maxTokens: number,
) {
  const geminiMessages = messages.map(m => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: geminiMessages,
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        generationConfig: { maxOutputTokens: maxTokens },
      }),
    },
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini error ${res.status}: ${err}`);
  }

  return res.body;
}

// Model → provider config
function getProviderConfig(modelId: string) {
  const configs: Record<string, { provider: string; baseURL: string; envKey: string; apiModel: string; type: "openai" | "anthropic" | "gemini" }> = {
    "claude-sonnet-4-20250514": { provider: "anthropic", baseURL: "", envKey: "ANTHROPIC_API_KEY", apiModel: "claude-sonnet-4-20250514", type: "anthropic" },
    "gpt-4o": { provider: "openai", baseURL: "https://api.openai.com/v1", envKey: "OPENAI_API_KEY", apiModel: "gpt-4o", type: "openai" },
    "o3": { provider: "openai", baseURL: "https://api.openai.com/v1", envKey: "OPENAI_API_KEY", apiModel: "o3-mini", type: "openai" },
    "gemini-2.5-pro": { provider: "google", baseURL: "", envKey: "GOOGLE_AI_API_KEY", apiModel: "gemini-2.5-pro-preview-05-06", type: "gemini" },
    "grok-3": { provider: "xai", baseURL: "https://api.x.ai/v1", envKey: "XAI_API_KEY", apiModel: "grok-3", type: "openai" },
    "mistral-large": { provider: "mistral", baseURL: "https://api.mistral.ai/v1", envKey: "MISTRAL_API_KEY", apiModel: "mistral-large-latest", type: "openai" },
    "deepseek-r2": { provider: "deepseek", baseURL: "https://api.deepseek.com", envKey: "DEEPSEEK_API_KEY", apiModel: "deepseek-chat", type: "openai" },
    "llama-4": { provider: "replicate", baseURL: "https://openrouter.ai/api/v1", envKey: "OPENROUTER_API_KEY", apiModel: "meta-llama/llama-4-scout", type: "openai" },
  };
  return configs[modelId] || null;
}

export async function POST(req: Request) {
  try {
    const supabaseAuth = await getSupabaseServer();
    const { data: { user } } = await supabaseAuth.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: "Non autorisé" }), { status: 401 });
    }

    const { messages, model: modelId } = await req.json();
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

    // Quota check
    const today = new Date().toISOString().slice(0, 10);
    const { data: usage } = await supabase.from("usage").select("request_count, tokens_used").eq("user_id", user.id).eq("date", today).single();
    const dailyCount = usage?.request_count || 0;

    if (dailyCount >= dailyLimit) {
      return new Response(JSON.stringify({ error: "Limite journalière atteinte", quota: { used: dailyCount, limit: dailyLimit, plan: planKey } }), { status: 429 });
    }

    const monthStart = today.slice(0, 7) + "-01";
    const { data: monthlyUsage } = await supabase.from("usage").select("request_count").eq("user_id", user.id).gte("date", monthStart);
    const monthlyTotal = (monthlyUsage || []).reduce((sum: number, row: { request_count: number }) => sum + row.request_count, 0);
    if (monthlyTotal >= monthlyLimit) {
      return new Response(JSON.stringify({ error: "Limite mensuelle atteinte" }), { status: 429 });
    }

    // Increment usage
    await supabase.from("usage").upsert({ user_id: user.id, date: today, request_count: dailyCount + 1, tokens_used: usage?.tokens_used || 0 }, { onConflict: "user_id,date" });

    const selectedModel = modelId || "claude-sonnet-4-20250514";
    const config = getProviderConfig(selectedModel);

    if (!config) {
      return new Response(JSON.stringify({ error: "Modèle non supporté" }), { status: 400 });
    }

    const apiKey = process.env[config.envKey];
    if (!apiKey) {
      return new Response(JSON.stringify({ error: `Clé API ${config.provider} non configurée` }), { status: 400 });
    }

    const encoder = new TextEncoder();
    const formattedMessages = messages.map((m: { role: string; content: string }) => ({ role: m.role, content: m.content }));

    // ANTHROPIC
    if (config.type === "anthropic") {
      const anthropic = new Anthropic({ apiKey });
      const stream = anthropic.messages.stream({
        model: config.apiModel,
        max_tokens: maxTokens,
        system: SYSTEM_PROMPT,
        messages: formattedMessages as { role: "user" | "assistant"; content: string }[],
      });

      const readable = new ReadableStream({
        async start(controller) {
          stream.on("text", (text) => controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`)));
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
    }

    // GEMINI
    if (config.type === "gemini") {
      const body = await streamGemini(apiKey, config.apiModel, formattedMessages, maxTokens);
      if (!body) throw new Error("No stream body");

      const readable = new ReadableStream({
        async start(controller) {
          const reader = body.getReader();
          const decoder = new TextDecoder();
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              const chunk = decoder.decode(value);
              const lines = chunk.split("\n").filter(l => l.startsWith("data: "));
              for (const line of lines) {
                try {
                  const data = JSON.parse(line.slice(6));
                  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
                  if (text) controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
                } catch {}
              }
            }
            controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
            controller.close();
          } catch (err) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: (err as Error).message })}\n\n`));
            controller.close();
          }
        },
      });

      return new Response(readable, { headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" } });
    }

    // OPENAI-COMPATIBLE (OpenAI, Mistral, DeepSeek, xAI, OpenRouter)
    const body = await streamOpenAICompatible(config.baseURL, apiKey, config.apiModel, formattedMessages, maxTokens);
    if (!body) throw new Error("No stream body");

    const readable = new ReadableStream({
      async start(controller) {
        const reader = body.getReader();
        const decoder = new TextDecoder();
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value);
            const lines = chunk.split("\n").filter(l => l.startsWith("data: "));
            for (const line of lines) {
              const data = line.slice(6).trim();
              if (data === "[DONE]") break;
              try {
                const parsed = JSON.parse(data);
                const text = parsed.choices?.[0]?.delta?.content;
                if (text) controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
              } catch {}
            }
          }
          controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
          controller.close();
        } catch (err) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: (err as Error).message })}\n\n`));
          controller.close();
        }
      },
    });

    return new Response(readable, { headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" } });
  } catch {
    return new Response(JSON.stringify({ error: "Erreur serveur" }), { status: 500 });
  }
}
