"use client";

const items = [
  { label: "Outils IA", omnia: "47 outils", mammouth: "~10 outils" },
  { label: "Prix mensuel", omnia: "17€/mois", mammouth: "27€/mois" },
  { label: "Studio Vidéo (Sora)", omnia: true, mammouth: false },
  { label: "IDE Code (Cursor)", omnia: true, mammouth: false },
  { label: "Agents Autonomes", omnia: true, mammouth: false },
  { label: "Automatisation n8n", omnia: true, mammouth: false },
  { label: "Studio Audio IA", omnia: true, mammouth: false },
  { label: "GPU Cloud", omnia: true, mammouth: false },
  { label: "API universelle", omnia: true, mammouth: false },
  { label: "RGPD France 🇫🇷", omnia: true, mammouth: true },
];

export default function ComparisonTable() {
  return (
    <div style={{ width: "100%", maxWidth: 460 }}>
      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <span style={{ display: "inline-block", background: "rgba(255,51,102,0.08)", border: "1px solid rgba(255,51,102,0.22)", borderRadius: 30, padding: "6px 16px", fontSize: 11, color: "#ff6b9d", fontWeight: 800, letterSpacing: ".1em" }}>
          ⚡ AKASHA AI VS MAMMOUTH IA
        </span>
      </div>
      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ padding: "14px" }} />
          <div style={{ padding: "14px 10px", textAlign: "center", background: "rgba(0,212,255,0.07)", borderLeft: "1px solid rgba(0,212,255,0.12)", position: "relative" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,#00d4ff,#6366f1)" }} />
            <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg,#00d4ff,#6366f1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, margin: "0 auto 6px", boxShadow: "0 0 14px rgba(0,212,255,0.4)" }}>⬡</div>
            <div style={{ fontSize: 12, fontWeight: 900, color: "#00d4ff", letterSpacing: ".02em" }}>AKASHA AI</div>
            <div style={{ fontSize: 9, color: "#39ff14", fontWeight: 800, marginTop: 2, letterSpacing: ".08em" }}>⭐ N°1</div>
          </div>
          <div style={{ padding: "14px 10px", textAlign: "center", borderLeft: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19, margin: "0 auto 6px" }}>🦣</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.38)" }}>Mammouth</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.18)", fontWeight: 600, marginTop: 2 }}>Concurrent</div>
          </div>
        </div>
        {items.map((item, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: i < items.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)" }}>
            <div style={{ padding: "11px 14px", fontSize: 12, color: "rgba(255,255,255,0.42)", display: "flex", alignItems: "center" }}>{item.label}</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "11px 8px", background: "rgba(0,212,255,0.04)", borderLeft: "1px solid rgba(0,212,255,0.07)" }}>
              {item.omnia === true
                ? <span style={{ fontSize: 17, color: "#39ff14", filter: "drop-shadow(0 0 5px #39ff14)" }}>✓</span>
                : <span style={{ fontSize: 13, fontWeight: 800, color: "#00d4ff" }}>{item.omnia as string}</span>
              }
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "11px 8px", borderLeft: "1px solid rgba(255,255,255,0.04)" }}>
              {item.mammouth === true
                ? <span style={{ fontSize: 17, color: "rgba(57,255,20,0.3)" }}>✓</span>
                : item.mammouth === false
                ? <span style={{ fontSize: 15, color: "rgba(255,255,255,0.13)" }}>✗</span>
                : <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.3)", textDecoration: "line-through" }}>{item.mammouth as string}</span>
              }
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        {[
          { val: "47×", label: "plus d'outils", color: "#00d4ff" },
          { val: "−10€", label: "moins cher/mois", color: "#39ff14" },
          { val: "9/9", label: "fonctions exclusives", color: "#ffd700" },
        ].map(s => (
          <div key={s.label} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "12px 8px", textAlign: "center" }}>
            <div style={{ fontSize: 18, fontWeight: 900, color: s.color, marginBottom: 3 }}>{s.val}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", lineHeight: 1.3 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <p style={{ textAlign: "center", fontSize: 10, color: "rgba(255,255,255,0.18)", marginTop: 10 }}>Données publiques · Mars 2025</p>
    </div>
  );
}
