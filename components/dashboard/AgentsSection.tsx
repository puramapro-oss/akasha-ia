"use client";
import { useState } from "react";
import { BORDER, CARD, AGENT_TEMPLATES } from "@/lib/constants";

export default function AgentsSection() {
  const [agents, setAgents] = useState(AGENT_TEMPLATES.map(a => ({ ...a })));
  const toggle = (id: string) => {
    setAgents(p => p.map(a => a.id === id ? { ...a, status: (a.status === "running" ? "idle" : "running") as "idle" | "running" | "paused" } : a));
  };
  const statusColors: Record<string, string> = { running: "#39ff14", idle: "rgba(255,255,255,.3)", paused: "#ffd700" };

  return (
    <div style={{ padding: "24px", overflowY: "auto", height: "100%" }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Agents Autonomes</h2>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,.4)" }}>Tes agents travaillent 24h/24 pendant que tu dors</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 14 }}>
        {agents.map(a => (
          <div key={a.id} style={{ background: a.status === "running" ? `${a.color}08` : CARD, border: `1px solid ${a.status === "running" ? a.color + "40" : BORDER}`, borderRadius: 16, padding: "20px", transition: "all .3s", boxShadow: a.status === "running" ? `0 0 24px ${a.color}20` : "none" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: `${a.color}20`, border: `1px solid ${a.color}50`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{a.icon}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{a.name}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: statusColors[a.status], boxShadow: a.status === "running" ? `0 0 6px ${statusColors[a.status]}` : "none", display: "inline-block", animation: a.status === "running" ? "pulse 1.5s infinite" : "none" }} />
                    <span style={{ fontSize: 10, color: statusColors[a.status], textTransform: "uppercase", letterSpacing: ".08em", fontWeight: 700 }}>{a.status === "running" ? "En cours" : a.status === "paused" ? "En pause" : "Inactif"}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => toggle(a.id)} style={{ padding: "6px 14px", background: a.status === "running" ? "rgba(255,51,102,.15)" : `${a.color}20`, border: `1px solid ${a.status === "running" ? "#ff3366" : a.color}50`, borderRadius: 8, color: a.status === "running" ? "#ff3366" : a.color, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>{a.status === "running" ? "⏸ Pause" : "▶ Lancer"}</button>
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,.5)", lineHeight: 1.5 }}>{a.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
