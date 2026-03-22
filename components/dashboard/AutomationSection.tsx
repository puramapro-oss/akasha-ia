"use client";
import { BORDER, CARD } from "@/lib/constants";

const workflows = [
  { id: 1, name: "Veille Concurrentielle", trigger: "Chaque lundi 8h00", steps: ["Perplexity scrute le web", "Claude analyse & résume", "Notion reçoit le rapport"], status: "active", runs: 24, color: "#00d4ff" },
  { id: 2, name: "Contenu Social Auto", trigger: "Nouveau article de blog", steps: ["GPT-4o génère 10 variantes", "Midjourney crée les visuels", "Zapier publie sur 5 réseaux"], status: "active", runs: 147, color: "#ffd700" },
  { id: 3, name: "Lead Nurturing IA", trigger: "Nouveau lead dans CRM", steps: ["Claude analyse le profil", "Personnalise l'email", "Send & track l'ouverture"], status: "paused", runs: 89, color: "#39ff14" },
  { id: 4, name: "Support Client Auto", trigger: "Nouveau ticket reçu", steps: ["Classify l'intent", "ElevenLabs voice reply", "Escalade si besoin"], status: "active", runs: 312, color: "#ff6b35" },
];

const platforms = [
  { name: "n8n", color: "#ea4b71", desc: "Workflows avancés", icon: "⟳", count: 12 },
  { name: "Make", color: "#6d00cc", desc: "Scénarios visuels", icon: "◈", count: 8 },
  { name: "Zapier", color: "#ff4a00", desc: "Automatisations rapides", icon: "⚡", count: 23 },
];

export default function AutomationSection() {
  return (
    <div style={{ padding: "24px", overflowY: "auto", height: "100%" }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Automatisation IA</h2>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,.4)" }}>n8n, Make et Zapier intégrés — workflows intelligents</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 24 }}>
        {platforms.map(p => (
          <div key={p.name} style={{ background: `${p.color}0d`, border: `1px solid ${p.color}40`, borderRadius: 14, padding: "16px", cursor: "pointer", transition: "all .2s" }} onMouseEnter={e => e.currentTarget.style.background = `${p.color}18`} onMouseLeave={e => e.currentTarget.style.background = `${p.color}0d`}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>{p.icon}</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>{p.name}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)", marginBottom: 8 }}>{p.desc}</div>
            <div style={{ fontSize: 11, color: p.color, fontWeight: 700 }}>{p.count} workflows actifs</div>
          </div>
        ))}
      </div>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: "rgba(255,255,255,.6)", marginBottom: 14, letterSpacing: ".05em" }}>WORKFLOWS EN COURS</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {workflows.map(w => (
          <div key={w.id} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: "16px 18px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: w.status === "active" ? "#39ff14" : "#ffd700", boxShadow: w.status === "active" ? "0 0 6px #39ff14" : "none", display: "inline-block", animation: w.status === "active" ? "pulse 2s infinite" : "none" }} />
                <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{w.name}</span>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,.35)", background: "rgba(255,255,255,.05)", borderRadius: 6, padding: "2px 8px" }}>{w.trigger}</span>
              </div>
              <span style={{ fontSize: 12, color: w.color, fontWeight: 700 }}>{w.runs} exéc.</span>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {w.steps.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,.5)", background: "rgba(255,255,255,.04)", border: `1px solid ${BORDER}`, borderRadius: 6, padding: "3px 10px" }}>{s}</span>
                  {i < w.steps.length - 1 && <span style={{ color: "rgba(255,255,255,.2)", fontSize: 11 }}>→</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
