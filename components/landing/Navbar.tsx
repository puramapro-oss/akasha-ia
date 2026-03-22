"use client";
import Link from "next/link";
import { ACCENT, BORDER } from "@/lib/constants";

export default function Navbar() {
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, height: 62, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", background: "rgba(6,6,15,0.85)", backdropFilter: "blur(24px)", borderBottom: `1px solid ${BORDER}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg,#00d4ff,#6366f1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, boxShadow: "0 0 20px #00d4ff60" }}>⬡</div>
        <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-.02em" }}>AKASHA<span style={{ color: ACCENT }}>AI</span></span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 28, fontSize: 13, color: "rgba(255,255,255,.55)" }}>
        {["Outils", "Fonctionnalités", "Tarifs", "API"].map(l => (
          <span key={l} style={{ cursor: "pointer", transition: "color .2s" }} onMouseEnter={e => (e.target as HTMLElement).style.color = "#fff"} onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(255,255,255,.55)"}>{l}</span>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <Link href="/connexion" style={{ padding: "8px 20px", background: "transparent", border: `1px solid ${BORDER}`, borderRadius: 10, color: "rgba(255,255,255,.7)", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .2s", textDecoration: "none" }}>Connexion</Link>
        <Link href="/onboarding" style={{ padding: "8px 20px", background: "linear-gradient(135deg,#00d4ff,#6366f1)", border: "none", borderRadius: 10, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: "0 0 20px #00d4ff50", transition: "transform .2s", textDecoration: "none" }}>
          Essai Gratuit →
        </Link>
      </div>
    </nav>
  );
}
