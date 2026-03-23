"use client";
import { useState } from "react";
import Link from "next/link";
import { BORDER, CARD } from "@/lib/constants";
import { PLANS, type PlanCategory } from "@/lib/plans";

const PRICE_ARGUMENTS = [
  { competitor: "Mammouth", price: "27\u20AC", akasha: "COMPLET \u00e0 22\u20AC", tools: "~10 outils vs 47" },
  { competitor: "ChatGPT+", price: "20\u20AC", akasha: "AUTOMATE d\u00e8s 7\u20AC", tools: "avec bien plus" },
  { competitor: "Cursor", price: "20\u20AC", akasha: "inclus dans BUILD d\u00e8s 7\u20AC", tools: "" },
  { competitor: "ElevenLabs", price: "22\u20AC", akasha: "inclus dans CREATE d\u00e8s 7\u20AC", tools: "" },
  { competitor: "n8n", price: "20\u20AC", akasha: "inclus dans AUTOMATE d\u00e8s 7\u20AC", tools: "" },
];

export default function PricingSection() {
  const [openModal, setOpenModal] = useState<PlanCategory | null>(null);
  const categories = Object.values(PLANS);

  return (
    <section id="pricing" style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <p style={{ fontSize: 11, letterSpacing: ".25em", color: "#ff6b9d", fontWeight: 800, marginBottom: 10, textTransform: "uppercase" }}>Tarifs transparents</p>
        <h2 style={{ fontSize: "clamp(24px,4vw,48px)", fontWeight: 800, marginBottom: 8 }}>
          Moins cher.<br /><span style={{ color: "#ff6b9d" }}>Infiniment plus puissant.</span>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>Sans engagement \u00B7 Satisfait ou rembours\u00e9 30 jours</p>
      </div>

      {/* 4 Plan cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 18, marginBottom: 56 }}>
        {categories.map((plan) => (
          <div
            key={plan.name}
            className="hover-lift"
            onClick={() => setOpenModal(plan.name)}
            style={{
              background: CARD, border: `1px solid ${plan.color}30`,
              borderRadius: 20, padding: "28px 24px", cursor: "pointer",
              transition: "all .3s", position: "relative",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = plan.color + "70")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = plan.color + "30")}
          >
            <div style={{ fontSize: 28, marginBottom: 12 }}>{plan.icon}</div>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".2em", color: plan.color, textTransform: "uppercase", marginBottom: 8 }}>
              {plan.name}
            </div>
            <div style={{ fontSize: 32, fontWeight: 900, color: "#fff", lineHeight: 1, marginBottom: 4 }}>
              {plan.tiers.essentiel.price}\u20AC
              <span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>/mois</span>
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginBottom: 16 }}>
              \u00e0 partir de
            </div>
            <div style={{ height: 1, background: `linear-gradient(90deg,${plan.color}40,transparent)`, marginBottom: 16 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>
              {plan.tools.slice(0, 4).map((t) => (
                <div key={t} style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: plan.color, fontSize: 10 }}>{"\u2713"}</span>{t}
                </div>
              ))}
              {plan.tools.length > 4 && (
                <div style={{ fontSize: 11, color: plan.color, fontWeight: 600 }}>+{plan.tools.length - 4} outils</div>
              )}
            </div>
            <div style={{
              width: "100%", padding: "10px", textAlign: "center",
              background: `${plan.color}15`, border: `1px solid ${plan.color}40`,
              borderRadius: 10, fontSize: 13, fontWeight: 700, color: plan.color,
            }}>
              Voir les offres \u2192
            </div>
          </div>
        ))}
      </div>

      {/* Price arguments */}
      <div style={{
        display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 20,
      }}>
        {PRICE_ARGUMENTS.map((a) => (
          <div key={a.competitor} style={{
            padding: "8px 16px", borderRadius: 10,
            background: "rgba(255,255,255,0.03)", border: `1px solid ${BORDER}`,
            fontSize: 12, color: "rgba(255,255,255,0.5)",
          }}>
            <span style={{ textDecoration: "line-through", color: "rgba(255,255,255,0.3)" }}>{a.competitor} {a.price}</span>
            {" \u2192 "}
            <span style={{ color: "#39ff14", fontWeight: 600 }}>{a.akasha}</span>
          </div>
        ))}
      </div>

      {/* Modal */}
      {openModal && (
        <div
          style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)",
            zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center",
            padding: 24,
          }}
          onClick={() => setOpenModal(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#0a0a14", border: `1px solid ${BORDER}`,
              borderRadius: 24, padding: "32px", maxWidth: 900, width: "100%",
              maxHeight: "90vh", overflowY: "auto",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
              <div>
                <div style={{ fontSize: 28, display: "inline-block", marginRight: 10 }}>{PLANS[openModal].icon}</div>
                <span style={{ fontSize: 22, fontWeight: 800, fontFamily: "var(--font-syne)", color: PLANS[openModal].color }}>
                  Plan {PLANS[openModal].name}
                </span>
              </div>
              <button onClick={() => setOpenModal(null)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: 24, cursor: "pointer" }}>{"\u2715"}</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 16 }}>
              {(["essentiel", "pro", "max"] as const).map((tier) => {
                const t = PLANS[openModal].tiers[tier];
                return (
                  <div key={tier} style={{
                    background: t.popular ? `${PLANS[openModal].color}0d` : CARD,
                    border: `${t.popular ? "2px" : "1px"} solid ${t.popular ? PLANS[openModal].color + "60" : BORDER}`,
                    borderRadius: 18, padding: "24px 20px", position: "relative",
                  }}>
                    {t.popular && (
                      <div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", background: PLANS[openModal].color, color: "#000", fontSize: 10, fontWeight: 800, padding: "3px 12px", borderRadius: 20 }}>
                        {"\u2B50"} POPULAIRE
                      </div>
                    )}
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".15em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 8 }}>{tier}</div>
                    <div style={{ fontSize: 38, fontWeight: 900, color: "#fff", lineHeight: 1, marginBottom: 4 }}>
                      {t.price}\u20AC<span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>/mois</span>
                    </div>
                    <div style={{ height: 1, background: `${BORDER}`, margin: "16px 0" }} />
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                      {t.features.map((f) => (
                        <div key={f} style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ color: PLANS[openModal].color, fontSize: 11, fontWeight: 800 }}>{"\u2713"}</span>{f}
                        </div>
                      ))}
                    </div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 16 }}>
                      {t.daily === 999 ? "Illimit\u00e9" : `${t.daily} req/jour`} \u00B7 {t.maxTokens} tokens max
                    </div>
                    <Link
                      href={`/onboarding?plan=${openModal}_${tier}`}
                      style={{
                        display: "block", width: "100%", padding: "12px", textAlign: "center",
                        background: t.popular ? PLANS[openModal].color : "transparent",
                        border: `2px solid ${PLANS[openModal].color}`,
                        borderRadius: 11, color: t.popular ? "#000" : PLANS[openModal].color,
                        fontSize: 13, fontWeight: 800, textDecoration: "none",
                      }}
                    >
                      Choisir {tier.charAt(0).toUpperCase() + tier.slice(1)} \u2192
                    </Link>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: 20, textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.25)" }}>
              Outils inclus : {PLANS[openModal].tools.join(" \u00B7 ")}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
