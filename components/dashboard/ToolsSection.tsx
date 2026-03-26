"use client";
import { useState } from "react";
import { ACCENT, BORDER, CARD, TOOLS_DATA } from "@/lib/constants";

function ToolCard({ t }: { t: typeof TOOLS_DATA[0] }) {
  const [h, setH] = useState(false);
  const isLive = t.status === "live";

  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ background: h ? `${t.color}10` : CARD, border: `1px solid ${h ? t.color + "60" : BORDER}`, borderRadius: 14, padding: "18px 16px", cursor: "pointer", transition: "all .25s", transform: h ? "translateY(-3px)" : "none", boxShadow: h ? `0 8px 24px ${t.color}20` : "none", opacity: isLive ? 1 : 0.7 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: `${t.color}20`, border: `1px solid ${t.color}50`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, color: t.color }}>{t.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: 6 }}>
            {t.name}
            {isLive && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#39ff14", boxShadow: "0 0 6px #39ff14", flexShrink: 0 }} />}
          </div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,.35)", textTransform: "uppercase", letterSpacing: ".08em" }}>{t.cat}</div>
        </div>
      </div>
      {isLive ? (
        <button style={{ width: "100%", padding: "8px", background: h ? t.color : "transparent", border: `1px solid ${t.color}50`, borderRadius: 8, color: h ? "#000" : t.color, fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all .2s" }}>Lancer →</button>
      ) : (
        <div style={{ width: "100%", padding: "8px", textAlign: "center", background: "rgba(255,255,255,0.03)", border: `1px solid ${BORDER}`, borderRadius: 8, fontSize: 11, color: "rgba(255,255,255,0.35)", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ffd700", animation: "pulse 2s infinite" }} />
          Intégration en cours
        </div>
      )}
    </div>
  );
}

export default function ToolsSection() {
  const [cat, setCat] = useState("Tous");
  const [filter, setFilter] = useState("all");
  const cats = ["Tous", ...Array.from(new Set(TOOLS_DATA.map(t => t.cat)))];
  let filtered = cat === "Tous" ? TOOLS_DATA : TOOLS_DATA.filter(t => t.cat === cat);
  if (filter === "live") filtered = filtered.filter(t => t.status === "live");
  if (filter === "coming") filtered = filtered.filter(t => t.status === "coming");

  const liveCount = TOOLS_DATA.filter(t => t.status === "live").length;
  const comingCount = TOOLS_DATA.filter(t => t.status === "coming").length;

  return (
    <div style={{ padding: "24px", overflowY: "auto", height: "100%" }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Outils IA</h2>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,.4)" }}>
          <span style={{ color: "#39ff14", fontWeight: 700 }}>{liveCount} connectés</span> · {comingCount} en cours d&apos;intégration
        </p>
      </div>

      {/* Status filter */}
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {[
          { key: "all", label: "Tous", count: TOOLS_DATA.length },
          { key: "live", label: "Connectés", count: liveCount },
          { key: "coming", label: "En cours", count: comingCount },
        ].map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)} style={{ padding: "5px 14px", borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: "pointer", background: filter === f.key ? "rgba(0,212,255,0.15)" : "transparent", border: `1px solid ${filter === f.key ? ACCENT : BORDER}`, color: filter === f.key ? ACCENT : "rgba(255,255,255,.4)" }}>
            {f.label} ({f.count})
          </button>
        ))}
      </div>

      {/* Category filter */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 22 }}>
        {cats.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{ padding: "6px 16px", borderRadius: 20, fontSize: 11, fontWeight: 700, cursor: "pointer", transition: "all .2s", letterSpacing: ".06em", textTransform: "uppercase", background: cat === c ? ACCENT : "transparent", border: `1px solid ${cat === c ? ACCENT : BORDER}`, color: cat === c ? "#000" : "rgba(255,255,255,.5)" }}>{c}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 12 }}>
        {filtered.map(t => <ToolCard key={t.id} t={t} />)}
      </div>
    </div>
  );
}
