"use client";
import { useState } from "react";
import { ACCENT, BORDER, CARD } from "@/lib/constants";

const FEATURES = [
  { icon: "\u26A1", title: "Multi-Model Flash", desc: "1 prompt \u2192 47 IA en parall\u00e8le. R\u00e9sultat optimal garanti.", color: "#00d4ff" },
  { icon: "\uD83C\uDFAC", title: "Studio Vid\u00e9o IA", desc: "Runway, Kling, HeyGen dans un seul timeline unifi\u00e9.", color: "#ffd700" },
  { icon: "\uD83D\uDCBB", title: "IDE Code Int\u00e9gr\u00e9", desc: "Cursor, Claude Code, v0 \u2014 code et d\u00e9ploie sans quitter la plateforme.", color: "#39ff14" },
  { icon: "\uD83E\uDD16", title: "Agents 24/7", desc: "Tes agents travaillent la nuit. Tu te r\u00e9veilles, c\u2019est fait.", color: "#ff6b9d" },
  { icon: "\u27F3", title: "n8n + Make + Zapier", desc: "3 plateformes d\u2019automatisation, z\u00e9ro abonnement en plus.", color: "#ea4b71" },
  { icon: "\uD83C\uDFA4", title: "Studio Audio Pro", desc: "ElevenLabs, Suno, Udio \u2014 qualit\u00e9 studio en quelques secondes.", color: "#ff6b35" },
];

function FeatureCard({ f }: { f: typeof FEATURES[0] }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  return (
    <div
      className="hover-lift"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: CARD, border: `1px solid ${BORDER}`,
        borderRadius: 20, padding: "28px 24px", position: "relative",
        overflow: "hidden", cursor: "default",
      }}
    >
      {/* Light follow effect */}
      {hover && (
        <div style={{
          position: "absolute", width: 200, height: 200, borderRadius: "50%",
          background: `radial-gradient(circle, ${f.color}20, transparent 70%)`,
          left: mouse.x - 100, top: mouse.y - 100, pointerEvents: "none",
          transition: "left .1s, top .1s",
        }} />
      )}
      <div style={{
        width: 48, height: 48, borderRadius: 14,
        background: `${f.color}15`, border: `1px solid ${f.color}40`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 22, marginBottom: 16, position: "relative",
      }}>{f.icon}</div>
      <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 8, position: "relative" }}>{f.title}</div>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.65, position: "relative" }}>{f.desc}</div>
      <div style={{ marginTop: 16, fontSize: 12, color: f.color, fontWeight: 700, position: "relative" }}>Inclus d\u00e8s 7\u20AC/mois \u2192</div>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section id="fonctionnalites" style={{ padding: "100px 24px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <p style={{ fontSize: 11, letterSpacing: ".25em", color: "#ffd700", fontWeight: 800, marginBottom: 10, textTransform: "uppercase" }}>Fonctionnalit\u00e9s exclusives</p>
        <h2 style={{ fontSize: "clamp(26px,4vw,52px)", fontWeight: 800, lineHeight: 1.1 }}>
          Tout ce dont tu as besoin,<br /><span style={{ color: ACCENT }}>enfin r\u00e9uni.</span>
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(310px,1fr))", gap: 18 }}>
        {FEATURES.map((f) => <FeatureCard key={f.title} f={f} />)}
      </div>
    </section>
  );
}
