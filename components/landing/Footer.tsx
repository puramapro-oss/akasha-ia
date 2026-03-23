import { ACCENT, BORDER } from "@/lib/constants";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${BORDER}`, padding: "28px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg,${ACCENT},#7c3aed)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#fff" }}>A</div>
        <span style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>AKASHA<span style={{ color: ACCENT }}>AI</span></span>
      </Link>
      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>{"©"} 2025 AKASHA AI · Tous droits réservés</span>
      <div style={{ display: "flex", gap: 20, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
        {["CGU", "Confidentialité", "Contact"].map(l => (
          <span key={l} style={{ cursor: "pointer", transition: "color .2s" }}
            onMouseEnter={e => ((e.target as HTMLElement).style.color = "#fff")}
            onMouseLeave={e => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.3)")}
          >{l}</span>
        ))}
      </div>
    </footer>
  );
}
