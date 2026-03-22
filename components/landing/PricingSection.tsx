"use client";
import Link from "next/link";
import Card3D from "@/components/effects/Card3D";
import { CARD, BORDER } from "@/lib/constants";

const PRICING = [
  { name: "SPARK", price: "7€", color: "#00d4ff", features: ["20 modèles LLM & Image", "150 req./jour", "Chat vocal", "iOS & Android"] },
  { name: "NOVA", price: "17€", color: "#ffd700", featured: true, features: ["47 modèles complets", "Studio Vidéo + Audio", "Cursor IDE + n8n", "Agents autonomes x5", "API Access", "600 req./jour"] },
  { name: "APEX", price: "37€", color: "#39ff14", features: ["Tout NOVA +", "Requêtes illimitées", "GPU illimité", "Équipe 10 users", "SLA 99,9%"] },
];

export default function PricingSection() {
  return (
    <section style={{ padding: "80px 40px", maxWidth: 1060, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <p style={{ fontSize: 11, letterSpacing: ".25em", color: "#ff3366", fontWeight: 800, marginBottom: 10, textTransform: "uppercase" }}>Tarifs transparents</p>
        <h2 style={{ fontSize: "clamp(24px,4vw,48px)", fontWeight: 800, marginBottom: 8 }}>Moins cher.<br /><span style={{ color: "#ff3366" }}>Infiniment plus puissant.</span></h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>Sans engagement · Satisfait ou remboursé 30 jours · Aucune CB requise</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 20 }}>
        {PRICING.map(p => (
          <Card3D key={p.name} intensity={10} style={{ background: p.featured ? `linear-gradient(160deg,${p.color}18,rgba(0,0,0,0.5))` : CARD, border: `${p.featured ? "2px" : "1px"} solid ${p.featured ? p.color + "70" : BORDER}`, borderRadius: 22, padding: "28px 24px", boxShadow: p.featured ? `0 0 60px ${p.color}25` : "none", position: "relative" }}>
            {p.featured && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: p.color, color: "#000", fontSize: 9, fontWeight: 900, padding: "4px 14px", borderRadius: 20, letterSpacing: ".15em", whiteSpace: "nowrap" }}>⭐ POPULAIRE</div>}
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".2em", color: p.color, marginBottom: 8, textTransform: "uppercase" }}>{p.name}</div>
            <div style={{ fontSize: 44, fontWeight: 900, color: "#fff", lineHeight: 1, marginBottom: 4 }}>{p.price}<span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>/mois</span></div>
            <div style={{ height: 1, background: `linear-gradient(90deg,${p.color}40,transparent)`, margin: "16px 0" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 22 }}>
              {p.features.map(f => <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.75)" }}><span style={{ color: p.color, fontWeight: 800, fontSize: 12 }}>✓</span>{f}</div>)}
            </div>
            <Link href="/onboarding" style={{ display: "block", width: "100%", padding: "12px", background: p.featured ? p.color : "transparent", border: `2px solid ${p.color}`, borderRadius: 11, color: p.featured ? "#000" : p.color, fontSize: 13, fontWeight: 800, cursor: "pointer", letterSpacing: ".06em", textDecoration: "none", textAlign: "center" }}>
              Commencer →
            </Link>
          </Card3D>
        ))}
      </div>
    </section>
  );
}
