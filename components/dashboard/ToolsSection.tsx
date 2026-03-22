"use client";
import { useState } from "react";
import { ACCENT, BORDER, CARD, TOOLS_DATA } from "@/lib/constants";

function ToolCard({ t, onLaunch }: { t: typeof TOOLS_DATA[0]; onLaunch: () => void }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ background: h ? `${t.color}10` : CARD, border: `1px solid ${h ? t.color + "60" : BORDER}`, borderRadius: 14, padding: "18px 16px", cursor: "pointer", transition: "all .25s", transform: h ? "translateY(-3px)" : "none", boxShadow: h ? `0 8px 24px ${t.color}20` : "none" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: `${t.color}20`, border: `1px solid ${t.color}50`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, color: t.color }}>{t.icon}</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{t.name}</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,.35)", textTransform: "uppercase", letterSpacing: ".08em" }}>{t.cat}</div>
        </div>
      </div>
      <button onClick={onLaunch} style={{ width: "100%", padding: "8px", background: h ? t.color : "transparent", border: `1px solid ${t.color}50`, borderRadius: 8, color: h ? "#000" : t.color, fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all .2s" }}>Lancer →</button>
    </div>
  );
}

export default function ToolsSection() {
  const [cat, setCat] = useState("Tous");
  const cats = ["Tous", ...Array.from(new Set(TOOLS_DATA.map(t => t.cat)))];
  const filtered = cat === "Tous" ? TOOLS_DATA : TOOLS_DATA.filter(t => t.cat === cat);

  return (
    <div style={{ padding: "24px", overflowY: "auto", height: "100%" }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Outils IA</h2>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,.4)" }}>47 outils intégrés, accessibles en un clic</p>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 22 }}>
        {cats.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{ padding: "6px 16px", borderRadius: 20, fontSize: 11, fontWeight: 700, cursor: "pointer", transition: "all .2s", letterSpacing: ".06em", textTransform: "uppercase", background: cat === c ? ACCENT : "transparent", border: `1px solid ${cat === c ? ACCENT : BORDER}`, color: cat === c ? "#000" : "rgba(255,255,255,.5)" }}>{c}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 12 }}>
        {filtered.map(t => <ToolCard key={t.id} t={t} onLaunch={() => {}} />)}
      </div>
    </div>
  );
}
