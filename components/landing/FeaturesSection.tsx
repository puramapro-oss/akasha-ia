"use client";
import Card3D from "@/components/effects/Card3D";
import { ACCENT } from "@/lib/constants";

const FEATURES_GRID = [
  { icon: "⚡", title: "Multi-Model Flash", desc: "1 prompt → 47 IA en parallèle. Résultat optimal garanti.", color: "#00d4ff" },
  { icon: "🎬", title: "Studio Vidéo IA", desc: "Sora, Runway, CapCut dans un seul timeline unifié.", color: "#ffd700" },
  { icon: "💻", title: "Cursor IDE Intégré", desc: "Code, debug, déploie sans jamais quitter la plateforme.", color: "#39ff14" },
  { icon: "🤖", title: "Agents 24/7", desc: "Tes agents travaillent la nuit. Tu te réveilles, c'est fait.", color: "#ff3366" },
  { icon: "⟳", title: "n8n + Make + Zapier", desc: "3 plateformes d'automatisation, zéro abonnement en plus.", color: "#ea4b71" },
  { icon: "🎵", title: "Studio Audio Pro", desc: "ElevenLabs, Suno, Udio — qualité studio en quelques secondes.", color: "#ff6b35" },
];

export default function FeaturesSection() {
  return (
    <section style={{ padding: "100px 40px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <p style={{ fontSize: 11, letterSpacing: ".25em", color: "#ffd700", fontWeight: 800, marginBottom: 10, textTransform: "uppercase" }}>Fonctionnalités exclusives</p>
        <h2 style={{ fontSize: "clamp(26px,4vw,52px)", fontWeight: 800, lineHeight: 1.1 }}>
          Tout ce dont tu as besoin,<br /><span style={{ color: ACCENT }}>enfin réuni.</span>
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(310px,1fr))", gap: 18 }}>
        {FEATURES_GRID.map(f => (
          <Card3D key={f.title} intensity={10} style={{ background: `linear-gradient(135deg,${f.color}0d,rgba(255,255,255,0.03))`, border: `1px solid ${f.color}30`, borderRadius: 20, padding: "28px 24px", boxShadow: `0 4px 32px ${f.color}10` }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: `${f.color}20`, border: `1px solid ${f.color}50`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 16, boxShadow: `0 0 20px ${f.color}30` }}>{f.icon}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 8 }}>{f.title}</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.65 }}>{f.desc}</div>
            <div style={{ marginTop: 16, fontSize: 12, color: f.color, fontWeight: 700 }}>Inclus dès 7€/mois →</div>
          </Card3D>
        ))}
      </div>
    </section>
  );
}
