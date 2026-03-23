"use client";
import { useState, useEffect } from "react";
import { ACCENT, BORDER, CARD } from "@/lib/constants";
import { getPlanConfig } from "@/lib/plans";

export default function AnalyticsSection({ userPlan }: { userPlan: string }) {
  const [period, setPeriod] = useState("7j");
  const [quotaData, setQuotaData] = useState({ daily: 0, monthly: 0, pct: 0, remaining: 0 });
  const planCfg = getPlanConfig(userPlan);
  const dailyLimit = planCfg?.tier.daily || 5;
  const maxTokens = planCfg?.tier.maxTokens || 500;
  const planColor = planCfg?.category.color || ACCENT;
  const planLabel = userPlan.replace("_", " ").toUpperCase();

  useEffect(() => {
    fetch("/api/usage").then(r => r.json()).then(d => setQuotaData({ daily: d.daily || 0, monthly: d.monthly || 0, pct: d.pct || 0, remaining: d.remaining ?? 0 })).catch(() => {});
  }, []);

  const chartData: Record<string, number[]> = { "7j": [12, 28, 18, 45, 32, 67, 43], "30j": [120, 180, 95, 220, 310, 280, 190, 410, 350, 290, 420, 380, 310, 450, 390, 320, 480, 420, 360, 510, 460, 390, 540, 490, 420, 580, 520, 450, 620, 560], "90j": Array.from({ length: 12 }, () => Math.floor(Math.random() * 800 + 200)) };
  const data = chartData[period] || chartData["7j"];
  const max = Math.max(...data);
  const labels7 = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

  return (
    <div style={{ padding: "24px", overflowY: "auto", height: "100%" }}>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Analytics</h2>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,.4)" }}>Consommation IA en temps r\u00e9el</p>
      </div>

      {/* Quota banner */}
      <div style={{ background: `linear-gradient(135deg,${planColor}12,rgba(0,0,0,.4))`, border: `1px solid ${planColor}40`, borderRadius: 16, padding: "18px 20px", marginBottom: 18, display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 11, color: planColor, fontWeight: 800, letterSpacing: ".1em", marginBottom: 4 }}>PLAN {planLabel} \u2014 QUOTA AUJOURD&apos;HUI</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: "#fff" }}>{quotaData.daily}<span style={{ fontSize: 14, color: "rgba(255,255,255,.4)", fontWeight: 400 }}>/{dailyLimit === 999 ? "\u221E" : dailyLimit} req</span></div>
        </div>
        <div style={{ flex: 1, minWidth: 140 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,.4)" }}>{quotaData.pct.toFixed(0)}% utilis\u00e9</span>
            <span style={{ fontSize: 11, color: quotaData.remaining > 0 ? "#39ff14" : "#ff3366", fontWeight: 700 }}>{dailyLimit === 999 ? "Illimit\u00e9" : `${quotaData.remaining} restantes`}</span>
          </div>
          <div style={{ height: 8, background: "rgba(255,255,255,.08)", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${Math.min(quotaData.pct, 100)}%`, background: quotaData.pct >= 90 ? "linear-gradient(90deg,#ffd700,#ff3366)" : `linear-gradient(90deg,${planColor},#7c3aed)`, borderRadius: 4, transition: "width .5s ease" }} />
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,.4)", marginBottom: 3 }}>Total ce mois</div>
          <div style={{ fontSize: 22, fontWeight: 900, color: "#fff" }}>{quotaData.monthly}</div>
        </div>
      </div>

      {/* Stats cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(170px,1fr))", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Requ\u00eates aujourd'hui", value: quotaData.daily, icon: "\u26A1", color: "#00d4ff" },
          { label: "Total ce mois", value: quotaData.monthly, icon: "\u25CE", color: "#ffd700" },
          { label: "Tokens max/requ\u00eate", value: maxTokens, icon: "\uD83D\uDD22", color: "#39ff14" },
          { label: "Limite journali\u00e8re", value: dailyLimit === 999 ? "\u221E" : dailyLimit, icon: "\u23F1", color: "#ff6b35" },
        ].map(s => (
          <div key={s.label} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: "16px" }}>
            <div style={{ fontSize: 18, marginBottom: 10 }}>{s.icon}</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "20px", marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>Requ\u00eates par jour</h3>
          <div style={{ display: "flex", gap: 6 }}>
            {["7j", "30j", "90j"].map(p => <button key={p} onClick={() => setPeriod(p)} style={{ padding: "4px 12px", borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: "pointer", background: period === p ? ACCENT : "transparent", border: `1px solid ${period === p ? ACCENT : BORDER}`, color: period === p ? "#000" : "rgba(255,255,255,.4)" }}>{p}</button>)}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 110 }}>
          {data.map((v, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ width: "100%", background: `linear-gradient(180deg,${ACCENT},#7c3aed)`, borderRadius: "4px 4px 0 0", height: `${(v / max) * 100}%`, transition: "height .4s ease", minHeight: 4, boxShadow: `0 0 6px ${ACCENT}40` }} />
              {period === "7j" && <span style={{ fontSize: 9, color: "rgba(255,255,255,.3)" }}>{labels7[i]}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Model usage */}
      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "20px" }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Utilisation par mod\u00e8le</h3>
        {[{ name: "Claude Sonnet 4", pct: 42, color: "#cc785c" }, { name: "GPT-4o", pct: 28, color: "#10a37f" }, { name: "Gemini 2.5", pct: 16, color: "#4285f4" }, { name: "Mistral", pct: 14, color: "#ff7000" }].map(m => (
          <div key={m.name} style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,.7)" }}>{m.name}</span>
              <span style={{ fontSize: 13, color: m.color, fontWeight: 700 }}>{m.pct}%</span>
            </div>
            <div style={{ height: 5, background: "rgba(255,255,255,.07)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${m.pct}%`, background: `linear-gradient(90deg,${m.color},${m.color}80)`, borderRadius: 3, transition: "width 1s ease" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
