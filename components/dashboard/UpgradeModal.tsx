"use client";
import { BORDER } from "@/lib/constants";
import { PLANS, getPlanConfig } from "@/lib/plans";

interface UpgradeModalProps {
  userPlan: string;
  used: number;
  onClose: () => void;
}

export default function UpgradeModal({ userPlan, used, onClose }: UpgradeModalProps) {
  const planCfg = getPlanConfig(userPlan);
  const planColor = planCfg?.category.color || "#00d4ff";
  const planLabel = userPlan.replace("_", " ").toUpperCase();

  const upgrades = Object.values(PLANS).flatMap(cat =>
    Object.values(cat.tiers)
      .filter(t => t.price > (planCfg?.tier.price || 0))
      .slice(0, 1)
      .map(t => ({ name: `${cat.name} ${t.tier}`, price: t.price, daily: t.daily, color: cat.color, key: `${cat.name}_${t.tier}` }))
  ).slice(0, 3);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9000, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.75)", backdropFilter: "blur(10px)" }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: "#0a0a1a", border: "1px solid rgba(255,215,0,0.3)", borderRadius: 24, padding: "36px 32px", maxWidth: 480, width: "90%", textAlign: "center", boxShadow: "0 40px 80px rgba(0,0,0,0.8)" }}>
        <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(255,215,0,0.12)", border: "1px solid rgba(255,215,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, margin: "0 auto 16px" }}>{"🚀"}</div>
        <h3 style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Limite journalière atteinte</h3>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 8 }}>
          Tu as utilisé tes <strong style={{ color: "#ffd700" }}>{used} requêtes</strong> du jour sur le plan <strong style={{ color: planColor }}>{planLabel}</strong>.
        </p>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 24 }}>Le compteur se remet à zéro à minuit, ou upgrade maintenant.</p>
        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          {upgrades.map(u => (
            <div key={u.key} style={{ flex: 1, background: `${u.color}10`, border: `1px solid ${u.color}40`, borderRadius: 14, padding: "14px 10px", cursor: "pointer", transition: "all .2s" }}
              onMouseEnter={e => (e.currentTarget.style.background = `${u.color}20`)}
              onMouseLeave={e => (e.currentTarget.style.background = `${u.color}10`)}>
              <div style={{ fontSize: 11, fontWeight: 800, color: u.color, marginBottom: 4 }}>{u.name}</div>
              <div style={{ fontSize: 18, fontWeight: 900, color: "#fff" }}>{u.price}€</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{u.daily === 999 ? "Illimité" : `${u.daily} req/jour`}</div>
            </div>
          ))}
        </div>
        <button onClick={onClose} style={{ width: "100%", padding: "11px", background: "transparent", border: `1px solid ${BORDER}`, borderRadius: 11, color: "rgba(255,255,255,0.4)", fontSize: 13, cursor: "pointer" }}>
          Attendre minuit
        </button>
      </div>
    </div>
  );
}
