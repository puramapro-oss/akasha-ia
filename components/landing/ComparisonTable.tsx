"use client";
import { ACCENT, BORDER, CARD, COMPARISON_DATA } from "@/lib/constants";

export default function ComparisonTable() {
  return (
    <section id="comparatif" style={{ padding: "100px 24px", maxWidth: 800, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <p style={{ fontSize: 11, letterSpacing: ".25em", color: "#ff6b9d", fontWeight: 800, marginBottom: 10, textTransform: "uppercase" }}>Le match</p>
        <h2 className="reveal" style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "clamp(28px, 4vw, 44px)" }}>
          AKASHA AI <span style={{ color: "rgba(255,255,255,0.3)" }}>vs</span> Mammouth IA
        </h2>
        <p className="reveal reveal-1" style={{ color: "rgba(255,255,255,0.4)", fontSize: 15, marginTop: 12 }}>
          Pourquoi payer plus pour moins ?
        </p>
      </div>

      <div className="reveal reveal-2" style={{
        borderRadius: 16, overflow: "hidden",
        border: `1px solid ${BORDER}`, background: CARD,
      }}>
        {/* Header */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
          borderBottom: `1px solid ${BORDER}`, padding: "16px 24px",
          background: "rgba(255,255,255,0.02)",
        }}>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", fontWeight: 500 }}>Crit\u00e8re</div>
          <div style={{ textAlign: "center", fontSize: 14, fontWeight: 700, color: ACCENT }}>AKASHA AI</div>
          <div style={{ textAlign: "center", fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.4)" }}>Mammouth IA</div>
        </div>

        {/* Rows */}
        {COMPARISON_DATA.map((row, i) => (
          <div key={row.label} style={{
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
            padding: "14px 24px",
            borderBottom: i < COMPARISON_DATA.length - 1 ? `1px solid ${BORDER}` : "none",
            transition: "background .2s",
          }}
            onMouseEnter={(e) => ((e.currentTarget).style.background = "rgba(255,255,255,0.02)")}
            onMouseLeave={(e) => ((e.currentTarget).style.background = "transparent")}
          >
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{row.label}</div>
            <div style={{ textAlign: "center", fontSize: 14, fontWeight: 600 }}>
              {typeof row.akasha === "boolean" ? (
                <span style={{ color: "#39ff14" }}>{"\u2713"}</span>
              ) : (
                <span style={{ color: ACCENT }}>{row.akasha}</span>
              )}
            </div>
            <div style={{ textAlign: "center", fontSize: 14 }}>
              {typeof row.mammouth === "boolean" ? (
                row.mammouth ? <span style={{ color: "#39ff14" }}>{"\u2713"}</span> : <span style={{ color: "#ef4444" }}>{"\u2717"}</span>
              ) : (
                <span style={{ color: "rgba(255,255,255,0.3)", textDecoration: row.label === "Prix" ? "line-through" : "none" }}>{row.mammouth}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary stats */}
      <div className="reveal reveal-3" style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 32, flexWrap: "wrap" }}>
        {[
          { value: "4.7\u00D7", label: "plus d\u2019outils" },
          { value: "\u221210\u20AC", label: "/mois" },
          { value: "9/9", label: "fonctions exclusives" },
        ].map((s) => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "var(--font-syne)", color: ACCENT }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
