import { getSupabaseServer } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const supabaseAuth = await getSupabaseServer();
    const { data: { user } } = await supabaseAuth.auth.getUser();
    if (!user) return new Response(JSON.stringify({ error: "Non autorisé" }), { status: 401 });

    const { text, voice } = await req.json();
    if (!text) return new Response(JSON.stringify({ error: "Texte requis" }), { status: 400 });

    // ElevenLabs
    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) return new Response(JSON.stringify({ error: "Clé ElevenLabs non configurée" }), { status: 400 });

    const voiceId = voice || "21m00Tcm4TlvDq8ikWAM"; // Rachel default

    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text: text.slice(0, 5000),
        model_id: "eleven_multilingual_v2",
        voice_settings: { stability: 0.5, similarity_boost: 0.75 },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return new Response(JSON.stringify({ error: `ElevenLabs: ${err}` }), { status: 500 });
    }

    const audioBuffer = await res.arrayBuffer();
    return new Response(audioBuffer, {
      headers: { "Content-Type": "audio/mpeg", "Content-Disposition": "inline; filename=akasha-voice.mp3" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 500 });
  }
}
