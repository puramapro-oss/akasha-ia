"use client";
import { useState, useEffect } from "react";
import { ACCENT, BORDER, CARD } from "@/lib/constants";
import { getPlanConfig } from "@/lib/plans";

interface TopbarProps {
  userName: string;
  userPlan: string;
}

const notifs = [
  { icon: "🤖", text: "Configure tes premiers agents autonomes", time: "Recommandé", color: "#00d4ff" },
  { icon: "💬", text: "Essaie le Multi-Chat IA avec Claude Sonnet 4", time: "Commencer â", color: "#cc785c" },
  { icon: "🎬", text: "Découvre le Studio Créatif IA", time: "Nouveau", color: "#ffd700" },
  { icon: "⟳", text: "Connecte n8n pour automatiser tes workflows", time: "Suggestion", color: "#ea4b71" },
];

export default function Topbar({ userName, userPlan }: TopbarProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [quotaData, setQuotaData] = useState({ daily: 0, pct: 0, limit: 5 });

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Bonjour" : hour < 18 ? "Bon après-midi" : "Bonsoir";
  const planCfg = getPlanConfig(userPlan);
  const dailyLimit = planCfg?.tier.daily || 5;
  const planColor = planCfg?.category.color || ACCENT;
  const planLabel = userPlan.replace("_", " ").toUpperCase();

  useEffect(() => {
    fetch("/api/usage")
      .then(r => r.json())
      .then(d => setQuotaData({ daily: d.daily || 0, pct: d.pct || 0, limit: d.limits?.daily || dailyLimit }))
      .catch(() => {});
  }, [dailyLimit]);

  return (
    <div style={{ height: 56, borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", background: "rgba(255,255,255,.01)", flexShrink: 0 }}>
      <div>
        <span style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{greeting}, <span style={{ color: ACCENT }}>{userName || "Champion"}</span> {"👋"}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Usage bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11, color: planColor, fontWeight: 700 }}>{planLabel}</span>
          <div style={{ width: 80, height: 5, background: "rgba(255,255,255,.1)", borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${Math.min(quotaData.pct, 100)}%`, background: quotaData.pct >= 80 ? "linear-gradient(90deg,#ffd700,#ff3366)" : `linear-gradient(90deg,${planColor},#7c3aed)`, borderRadius: 3, transition: "width .4s" }} />
          </div>
          <span style={{ fontSize: 11, color: quotaData.pct >= 80 ? "#ffd700" : planColor, fontWeight: 700 }}>
            {quotaData.daily}/{dailyLimit === 999 ? "∞" : dailyLimit}
          </span>
        </div>

        {/* Notif bell */}
        <div style={{ position: "relative" }}>
          <button onClick={() => setNotifOpen(v => !v)} style={{ width: 34, height: 34, borderRadius: 9, background: CARD, border: `1px solid ${BORDER}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, position: "relative", color: "#fff" }}>
            {"🔔"}
            <span style={{ position: "absolute", top: -4, right: -4, width: 16, height: 16, background: "#ff3366", borderRadius: "50%", fontSize: 9, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>4</span>
          </button>
          {notifOpen && (
            <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, width: 300, background: "rgba(6,6,15,.98)", border: `1px solid ${BORDER}`, borderRadius: 14, padding: 10, zIndex: 200, boxShadow: "0 20px 40px rgba(0,0,0,.7)" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,.4)", letterSpacing: ".1em", padding: "6px 8px 10px", borderBottom: `1px solid ${BORDER}`, marginBottom: 6 }}>NOTIFICATIONS</div>
              {notifs.map((n, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "9px 8px", borderRadius: 9, cursor: "pointer", transition: "background .15s" }} onMouseEnter={e => (e.currentTarget.style.background = CARD)} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                  <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{n.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, color: "#fff", lineHeight: 1.4 }}>{n.text}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,.3)", marginTop: 3 }}>{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button style={{ width: 34, height: 34, borderRadius: 9, background: CARD, border: `1px solid ${BORDER}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, color: "#fff" }}>{"🔍"}</button>
      </div>
    </div>
  );
}
