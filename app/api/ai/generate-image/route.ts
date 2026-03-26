import { getSupabaseAdmin, getSupabaseServer } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const supabaseAuth = await getSupabaseServer();
    const { data: { user } } = await supabaseAuth.auth.getUser();
    if (!user) return new Response(JSON.stringify({ error: "Non autorisé" }), { status: 401 });

    const { prompt, provider } = await req.json();
    if (!prompt) return new Response(JSON.stringify({ error: "Prompt requis" }), { status: 400 });

    // FLUX via Replicate
    if (provider === "flux" || provider === "replicate") {
      const apiKey = process.env.REPLICATE_API_KEY;
      if (!apiKey) return new Response(JSON.stringify({ error: "Clé Replicate non configurée" }), { status: 400 });

      const res = await fetch("https://api.replicate.com/v1/predictions", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "black-forest-labs/flux-1.1-pro",
          input: { prompt, aspect_ratio: "1:1" },
        }),
      });

      const data = await res.json();
      if (!res.ok) return new Response(JSON.stringify({ error: data.detail || "Erreur Replicate" }), { status: 500 });

      // Poll for result
      let result = data;
      while (result.status === "starting" || result.status === "processing") {
        await new Promise(r => setTimeout(r, 2000));
        const poll = await fetch(result.urls.get, { headers: { Authorization: `Bearer ${apiKey}` } });
        result = await poll.json();
      }

      if (result.status === "succeeded") {
        // Increment usage
        const supabase = getSupabaseAdmin();
        const today = new Date().toISOString().slice(0, 10);
        const { data: usage } = await supabase.from("usage").select("request_count").eq("user_id", user.id).eq("date", today).single();
        await supabase.from("usage").upsert({ user_id: user.id, date: today, request_count: (usage?.request_count || 0) + 1 }, { onConflict: "user_id,date" });

        return Response.json({ url: Array.isArray(result.output) ? result.output[0] : result.output, provider: "flux" });
      }

      return new Response(JSON.stringify({ error: "Génération échouée" }), { status: 500 });
    }

    // OpenAI DALL-E
    if (provider === "dalle" || provider === "openai") {
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) return new Response(JSON.stringify({ error: "Clé OpenAI non configurée" }), { status: 400 });

      const res = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ model: "dall-e-3", prompt, n: 1, size: "1024x1024", quality: "standard" }),
      });

      const data = await res.json();
      if (!res.ok) return new Response(JSON.stringify({ error: data.error?.message || "Erreur DALL-E" }), { status: 500 });

      const supabase = getSupabaseAdmin();
      const today = new Date().toISOString().slice(0, 10);
      const { data: usage } = await supabase.from("usage").select("request_count").eq("user_id", user.id).eq("date", today).single();
      await supabase.from("usage").upsert({ user_id: user.id, date: today, request_count: (usage?.request_count || 0) + 1 }, { onConflict: "user_id,date" });

      return Response.json({ url: data.data[0].url, revised_prompt: data.data[0].revised_prompt, provider: "dalle" });
    }

    return new Response(JSON.stringify({ error: "Provider image non supporté" }), { status: 400 });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 500 });
  }
}
