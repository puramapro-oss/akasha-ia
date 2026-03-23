"use client";
import { ACCENT, BORDER, MODELS } from "@/lib/constants";

export default function DashboardMockup() {
  return (
    <section style={{ padding: "80px 24px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 400, background: "radial-gradient(ellipse,rgba(0,212,255,0.08),transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
      <div style={{ textAlign: "center", marginBottom: 48, position: "relative", zIndex: 2 }}>
        <p style={{ fontSize: 11, letterSpacing: ".25em", color: "#ff6b9d", fontWeight: 800, marginBottom: 10, textTransform: "uppercase" }}>Interface dashboard</p>
        <h2 style={{ fontSize: "clamp(24px,4vw,48px)", fontWeight: 800 }}>
          Une interface qui<br /><span style={{ color: "#ffd700" }}>redéfinit la productivité.</span>
        </h2>
      </div>
      <div className="hover-lift" style={{
        maxWidth: 960, margin: "0 auto",
        background: "rgba(255,255,255,0.03)", border: `1px solid ${BORDER}`,
        borderRadius: 24, overflow: "hidden",
        boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 80px rgba(0,212,255,0.08)",
        position: "relative", zIndex: 2,
      }}>
        {/* Browser bar */}
        <div style={{ padding: "14px 20px", background: "rgba(255,255,255,0.03)", borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", gap: 6 }}>
            {["#ff5f57", "#ffbd2e", "#28ca41"].map(c => <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />)}
          </div>
          <div style={{ flex: 1, background: "rgba(255,255,255,0.06)", borderRadius: 8, padding: "5px 14px", fontSize: 11, color: "rgba(255,255,255,0.3)", textAlign: "center" }}>app.akasha-ai.fr/dashboard</div>
        </div>
        {/* Fake dashboard */}
        <div style={{ display: "flex", height: 340 }}>
          {/* Sidebar */}
          <div style={{ width: 56, background: "rgba(255,255,255,0.02)", borderRight: `1px solid ${BORDER}`, display: "flex", flexDirection: "column", alignItems: "center", padding: "16px 0", gap: 14 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: `linear-gradient(135deg,${ACCENT},#7c3aed)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#fff" }}>A</div>
            {["ÃÂ°ÃÂÃÂÃÂ¬", "ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ", "Ã°ÂÂ¤Â", "ð¬", "📊"].map((ic, i) => (
              <div key={i} style={{ width: 32, height: 32, borderRadius: 8, background: i === 0 ? "rgba(0,212,255,0.15)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>{ic}</div>
            ))}
          </div>
          {/* Chat area */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 20px", gap: 10 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(204,120,92,0.2)", border: "1px solid #cc785c50", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#cc785c", flexShrink: 0 }}>{"◈"}</div>
              <div style={{ padding: "10px 14px", background: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`, borderRadius: "4px 14px 14px 14px", fontSize: 12, color: "rgba(255,255,255,0.7)", maxWidth: 420, lineHeight: 1.6 }}>
                Bonjour ! Je suis <strong style={{ color: "#fff" }}>AKASHA AI</strong>, ton assistant IA avec accès à 47 outils. Comment puis-je t&apos;aider ?
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start", justifyContent: "flex-end" }}>
              <div style={{ padding: "10px 14px", background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)", borderRadius: "14px 4px 14px 14px", fontSize: 12, color: "rgba(255,255,255,0.8)", maxWidth: 300, lineHeight: 1.6 }}>
                Génère une landing page complète pour ma startup SaaS
              </div>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg,${ACCENT},#7c3aed)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, flexShrink: 0, color: "#fff" }}>T</div>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(204,120,92,0.2)", border: "1px solid #cc785c50", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#cc785c", flexShrink: 0 }}>{"◈"}</div>
              <div style={{ padding: "10px 14px", background: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`, borderRadius: "4px 14px 14px 14px", fontSize: 12, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
                Voici ta landing page avec hero, features, pricing… <span style={{ color: ACCENT, animation: "pulse 1s infinite" }}>{"â"}</span>
              </div>
            </div>
          </div>
          {/* Models panel */}
          <div style={{ width: 180, borderLeft: `1px solid ${BORDER}`, padding: "14px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: ".1em", marginBottom: 4 }}>MODLES ACTIFS</div>
            {MODELS.slice(0, 4).map(m => (
              <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 7, padding: "6px 8px", background: m.real ? `${m.color}15` : "transparent", border: `1px solid ${m.real ? m.color + "40" : BORDER}`, borderRadius: 8 }}>
                <span style={{ color: m.color, fontSize: 11 }}>{m.icon}</span>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{m.name}</span>
                {m.real && <span style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: "#39ff14", boxShadow: "0 0 4px #39ff14", flexShrink: 0 }} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
