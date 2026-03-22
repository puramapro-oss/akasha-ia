"use client";
import { useState } from "react";
import { BORDER, CARD } from "@/lib/constants";

const tabs = [
  { id: "image", label: "🖼 Image IA", color: "#ff6b9d" },
  { id: "video", label: "🎬 Vidéo IA", color: "#ffd700" },
  { id: "audio", label: "🎵 Audio IA", color: "#ff6b35" },
  { id: "code", label: "💻 Code IA", color: "#39ff14" },
];

const toolsMap: Record<string, string[]> = {
  image: ["Midjourney v7", "FLUX Pro", "DALL·E 4", "Adobe Firefly", "Canva IA", "Ideogram 3"],
  video: ["Sora 2", "Runway Gen-4", "CapCut IA", "Kling 2.0", "HeyGen Avatar", "Luma Dream"],
  audio: ["ElevenLabs v3", "Suno v4", "Udio 2", "Whisper Pro", "Stable Audio 2"],
  code: ["Cursor Agent", "v0.dev", "Bolt.new", "GitHub Copilot X"],
};

export default function StudioSection() {
  const [activeTab, setActiveTab] = useState("image");
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [results, setResults] = useState<{ id: number; prompt: string; type: string; time: string }[]>([]);

  const generate = async () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    await new Promise(r => setTimeout(r, 2000));
    setResults(p => [{ id: Date.now(), prompt, type: activeTab, time: "maintenant" }, ...p.slice(0, 7)]);
    setGenerating(false);
  };

  return (
    <div style={{ padding: "24px", overflowY: "auto", height: "100%" }}>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Studio Créatif IA</h2>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,.4)" }}>Image, vidéo, audio et code — tout en un</p>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ padding: "8px 18px", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all .2s", background: activeTab === t.id ? t.color : "transparent", border: `1px solid ${activeTab === t.id ? t.color : BORDER}`, color: activeTab === t.id ? (activeTab === "image" ? "#fff" : "#000") : "rgba(255,255,255,.5)" }}>{t.label}</button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        {(toolsMap[activeTab] || []).map(n => <span key={n} style={{ fontSize: 11, padding: "4px 12px", background: CARD, border: `1px solid ${BORDER}`, borderRadius: 20, color: "rgba(255,255,255,.5)" }}>{n}</span>)}
      </div>
      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: "16px", marginBottom: 16 }}>
        <textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder={activeTab === "image" ? "Décris l'image que tu veux générer..." : activeTab === "video" ? "Décris la vidéo : scène, style, durée..." : activeTab === "audio" ? "Décris la musique, le genre, l'ambiance..." : "Décris le code ou l'app à créer..."} rows={3} style={{ width: "100%", background: "transparent", border: "none", color: "#fff", fontSize: 14, resize: "none", outline: "none", lineHeight: 1.6, fontFamily: "inherit" }} />
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
          <button onClick={generate} disabled={!prompt.trim() || generating} style={{ padding: "10px 24px", background: generating || !prompt.trim() ? "rgba(255,255,255,.1)" : `linear-gradient(135deg,${tabs.find(t => t.id === activeTab)?.color},#6366f1)`, border: "none", borderRadius: 10, color: "#fff", fontSize: 13, fontWeight: 700, cursor: prompt.trim() && !generating ? "pointer" : "not-allowed", display: "flex", alignItems: "center", gap: 8 }}>
            {generating ? <><span style={{ width: 14, height: 14, border: "2px solid rgba(255,255,255,.2)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 1s linear infinite" }} />Génération...</> : "✨ Générer"}
          </button>
        </div>
      </div>
      {results.length > 0 && (
        <div>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,.4)", marginBottom: 12, letterSpacing: ".08em" }}>GÉNÉRATIONS RÉCENTES</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {results.map(r => (
              <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12 }}>
                <span style={{ fontSize: 18 }}>{r.type === "image" ? "🖼" : r.type === "video" ? "🎬" : r.type === "audio" ? "🎵" : "💻"}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: "#fff", fontWeight: 500 }}>{r.prompt.slice(0, 60)}{r.prompt.length > 60 ? "..." : ""}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.3)", marginTop: 2 }}>{r.time}</div>
                </div>
                <button style={{ padding: "5px 12px", background: "transparent", border: `1px solid ${BORDER}`, borderRadius: 7, color: "rgba(255,255,255,.5)", fontSize: 11, cursor: "pointer" }}>⬇ Export</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
