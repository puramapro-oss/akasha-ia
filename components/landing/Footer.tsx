import { ACCENT, BORDER } from "@/lib/constants";

export default function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${BORDER}`, padding: "28px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,#00d4ff,#6366f1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>⬡</div>
        <span style={{ fontSize: 14, fontWeight: 800 }}>AKASHA<span style={{ color: ACCENT }}>AI</span></span>
      </div>
      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>© 2025 AKASHA AI · Tous droits réservés · Hébergé en France 🇫🇷</span>
      <div style={{ display: "flex", gap: 20, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
        {["CGU", "Confidentialité", "Contact"].map(l => <span key={l} style={{ cursor: "pointer" }} onMouseEnter={e => (e.target as HTMLElement).style.color = "#fff"} onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(255,255,255,0.3)"}>{l}</span>)}
      </div>
    </footer>
  );
}
