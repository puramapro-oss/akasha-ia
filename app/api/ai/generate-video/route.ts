import { getSupabaseServer } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const supabaseAuth = await getSupabaseServer();
    const { data: { user } } = await supabaseAuth.auth.getUser();
    if (!user) return new Response(JSON.stringify({ error: "Non autorisé" }), { status: 401 });

    const { prompt, provider } = await req.json();
    if (!prompt) return new Response(JSON.stringify({ error: "Prompt requis" }), { status: 400 });

    // Runway Gen-4 via API
    if (provider === "runway") {
      const apiKey = process.env.RUNWAY_API_KEY;
      if (!apiKey) return new Response(JSON.stringify({ error: "Clé Runway non configurée" }), { status: 400 });

      const res = await fetch("https://api.dev.runwayml.com/v1/image_to_video", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "X-Runway-Version": "2024-11-06" },
        body: JSON.stringify({ model: "gen4_turbo", promptText: prompt, duration: 5, ratio: "1280:768" }),
      });

      const data = await res.json();
      if (!res.ok) return new Response(JSON.stringify({ error: data.error || "Erreur Runway" }), { status: 500 });

      return Response.json({ taskId: data.id, status: "processing", provider: "runway", message: "Vidéo en cours de génération. Vérifiez le statut dans quelques secondes." });
    }

    // Replicate video models
    if (provider === "replicate") {
      const apiKey = process.env.REPLICATE_API_KEY;
      if (!apiKey) return new Response(JSON.stringify({ error: "Clé Replicate non configurée" }), { status: 400 });

      const res = await fetch("https://api.replicate.com/v1/predictions", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "minimax/video-01",
          input: { prompt },
        }),
      });

      const data = await res.json();
      if (!res.ok) return new Response(JSON.stringify({ error: data.detail || "Erreur Replicate" }), { status: 500 });

      return Response.json({ taskId: data.id, status: "processing", provider: "replicate", pollUrl: data.urls?.get });
    }

    return new Response(JSON.stringify({ error: "Provider vidéo non supporté" }), { status: 400 });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 500 });
  }
}
