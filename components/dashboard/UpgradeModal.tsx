"use client";
import { PLANS_CONFIG, type PlanName } from "@/lib/plans";
import { BORDER } from "@/lib/constants";

interface UpgradeModalProps {
  planLabel: PlanName;
  used: number;
  onClose: () => void;
  onUpgrade: (plan: PlanName) => void;
}

export default function UpgradeModal({ planLabel, used, onClose, onUpgrade }: UpgradeModalProps) {
  const plan = PLANS_CONFIG[planLabel];
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9000, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.75)", backdropFilter: "blur(10px)" }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: "#0a0a1a", border: "1px solid rgba(255,215,0,0.3)", borderRadius: 24, padding: "36px 32px", maxWidth: 420, width: "90%", textAlign: "center", boxShadow: "0 40px 80px rgba(0,0,0,0.8)" }}>
        <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(255,215,0,0.12)", border: "1px solid rgba(255,215,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, margin: "0 auto 16px" }}>🚀</div>
        <h3 style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Limite journalière atteinte</h3>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 8 }}>
          Tu as utilisé tes <strong style={{ color: "#ffd700" }}>{used} requêtes</strong> du jour sur le plan <strong style={{ color: plan.color }}>{plan.label}</strong>.
        </p>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 24 }}>Le compteur se remet à zéro à minuit, ou upgrade maintenant pour continuer.</p>
        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          {Object.values(PLANS_CONFIG).filter(p => p.label !== plan.label).map(p => (
            <div key={p.label} onClick={() => onUpgrade(p.label)} style={{ flex: 1, background: `${p.color}10`, border: `1px solid ${p.color}40`, borderRadius: 14, padding: "14px 10px", cursor: "pointer", transition: "all .2s" }}
              onMouseEnter={e => (e.currentTarget.style.background = `${p.color}20`)}
              onMouseLeave={e => (e.currentTarget.style.background = `${p.color}10`)}>
              <div style={{ fontSize: 11, fontWeight: 800, color: p.color, marginBottom: 4 }}>{p.label}</div>
              <div style={{ fontSize: 18, fontWeight: 900, color: "#fff" }}>{p.price}€</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{p.daily === 999 ? "Illimité" : `${p.daily} req/jour`}</div>
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
