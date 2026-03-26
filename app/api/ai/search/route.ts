import { getSupabaseServer } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const supabaseAuth = await getSupabaseServer();
    const { data: { user } } = await supabaseAuth.auth.getUser();
    if (!user) return new Response(JSON.stringify({ error: "Non autorisé" }), { status: 401 });

    const { query } = await req.json();
    if (!query) return new Response(JSON.stringify({ error: "Query requis" }), { status: 400 });

    // Perplexity Sonar
    const apiKey = process.env.PERPLEXITY_API_KEY;
    if (!apiKey) return new Response(JSON.stringify({ error: "Clé Perplexity non configurée" }), { status: 400 });

    const res = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          { role: "system", content: "Tu es un assistant de recherche. Réponds en français avec des sources." },
          { role: "user", content: query },
        ],
      }),
    });

    const data = await res.json();
    if (!res.ok) return new Response(JSON.stringify({ error: data.error?.message || "Erreur Perplexity" }), { status: 500 });

    return Response.json({
      answer: data.choices?.[0]?.message?.content || "Pas de résultat",
      citations: data.citations || [],
      provider: "perplexity",
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 500 });
  }
}
