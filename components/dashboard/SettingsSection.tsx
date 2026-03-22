"use client";
import { useState } from "react";
import { ACCENT, BORDER, CARD } from "@/lib/constants";
import { PLANS_CONFIG, type PlanName } from "@/lib/plans";

export default function SettingsSection({ userName, userEmail, userPlan }: { userName: string; userEmail: string; userPlan: PlanName }) {
  const [tab, setTab] = useState("profile");
  const [notifs, setNotifs] = useState<Record<string, boolean>>({ email: true, push: true, agents: true, billing: false });
  const [dark, setDark] = useState(true);
  const tabs2 = ["profile", "notifications", "sécurité", "apparence", "facturation"];
  const currentPlan = PLANS_CONFIG[userPlan] || PLANS_CONFIG.SPARK;

  const handleCheckout = async (plan: string) => {
    const res = await fetch("/api/stripe/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ plan }) });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

  return (
    <div style={{ padding: "24px", overflowY: "auto", height: "100%" }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Paramètres</h2>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,.4)" }}>Gère ton compte et tes préférences</p>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {tabs2.map(t => <button key={t} onClick={() => setTab(t)} style={{ padding: "7px 18px", borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: "pointer", background: tab === t ? ACCENT : "transparent", border: `1px solid ${tab === t ? ACCENT : BORDER}`, color: tab === t ? "#000" : "rgba(255,255,255,.5)", textTransform: "capitalize" }}>{t}</button>)}
      </div>

      {tab === "profile" && (
        <div style={{ maxWidth: 500 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, padding: "20px", background: CARD, border: `1px solid ${BORDER}`, borderRadius: 14 }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg,#00d4ff,#6366f1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 800, color: "#fff" }}>{userName?.[0]?.toUpperCase() || "U"}</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>{userName}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,.4)" }}>{userEmail}</div>
              <div style={{ fontSize: 11, color: "#ffd700", marginTop: 4, fontWeight: 700 }}>Plan {userPlan}</div>
            </div>
          </div>
          {[{ label: "Prénom", val: userName }, { label: "Email", val: userEmail }, { label: "Entreprise", val: "Ma Startup" }].map(f => (
            <div key={f.label} style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, color: "rgba(255,255,255,.4)", display: "block", marginBottom: 5 }}>{f.label}</label>
              <input defaultValue={f.val} style={{ width: "100%", padding: "11px 14px", background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, color: "#fff", fontSize: 14, outline: "none" }} onFocus={e => e.target.style.borderColor = ACCENT} onBlur={e => e.target.style.borderColor = BORDER} />
            </div>
          ))}
          <button style={{ padding: "11px 24px", background: "linear-gradient(135deg,#00d4ff,#6366f1)", border: "none", borderRadius: 10, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Enregistrer</button>
        </div>
      )}

      {tab === "notifications" && (
        <div style={{ maxWidth: 480 }}>
          {[{ id: "email", label: "Notifications email", desc: "Reçois les rapports et alertes par email" }, { id: "push", label: "Notifications push", desc: "Alertes instantanées dans le navigateur" }, { id: "agents", label: "Rapports agents", desc: "Résumé quotidien de tes agents autonomes" }, { id: "billing", label: "Alertes facturation", desc: "Prévenu avant d'atteindre ta limite" }].map(n => (
            <div key={n.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px", background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, marginBottom: 10 }}>
              <div><div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{n.label}</div><div style={{ fontSize: 12, color: "rgba(255,255,255,.4)", marginTop: 3 }}>{n.desc}</div></div>
              <div onClick={() => setNotifs(p => ({ ...p, [n.id]: !p[n.id] }))} style={{ width: 44, height: 24, borderRadius: 12, background: notifs[n.id] ? ACCENT : "rgba(255,255,255,.15)", cursor: "pointer", transition: "all .3s", position: "relative", flexShrink: 0 }}>
                <div style={{ position: "absolute", top: 3, left: notifs[n.id] ? 23 : 3, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left .3s" }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "sécurité" && (
        <div style={{ maxWidth: 480 }}>
          {[{ label: "Mot de passe actuel" }, { label: "Nouveau mot de passe" }, { label: "Confirmer" }].map(f => (
            <div key={f.label} style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, color: "rgba(255,255,255,.4)", display: "block", marginBottom: 5 }}>{f.label}</label>
              <input type="password" placeholder="••••••••" style={{ width: "100%", padding: "11px 14px", background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, color: "#fff", fontSize: 14, outline: "none" }} onFocus={e => e.target.style.borderColor = ACCENT} onBlur={e => e.target.style.borderColor = BORDER} />
            </div>
          ))}
          <button style={{ padding: "11px 24px", background: "linear-gradient(135deg,#00d4ff,#6366f1)", border: "none", borderRadius: 10, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", marginBottom: 24 }}>Changer le mot de passe</button>
          <div style={{ padding: "16px", background: "rgba(255,51,102,.06)", border: "1px solid rgba(255,51,102,.2)", borderRadius: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#ff3366", marginBottom: 6 }}>⚠ Zone de danger</div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,.4)", marginBottom: 14 }}>La suppression de ton compte est irréversible.</p>
            <button style={{ padding: "9px 18px", background: "transparent", border: "1px solid #ff3366", borderRadius: 8, color: "#ff3366", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Supprimer mon compte</button>
          </div>
        </div>
      )}

      {tab === "apparence" && (
        <div style={{ maxWidth: 480 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px", background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, marginBottom: 10 }}>
            <div><div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>Mode sombre</div><div style={{ fontSize: 12, color: "rgba(255,255,255,.4)", marginTop: 3 }}>Interface noire — recommandé pour AKASHA AI</div></div>
            <div onClick={() => setDark(v => !v)} style={{ width: 44, height: 24, borderRadius: 12, background: dark ? ACCENT : "rgba(255,255,255,.15)", cursor: "pointer", transition: "all .3s", position: "relative", flexShrink: 0 }}>
              <div style={{ position: "absolute", top: 3, left: dark ? 23 : 3, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left .3s" }} />
            </div>
          </div>
          <div style={{ padding: "16px", background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 12 }}>Couleur d&apos;accent</div>
            <div style={{ display: "flex", gap: 10 }}>
              {["#00d4ff", "#6366f1", "#ff3366", "#39ff14", "#ffd700", "#e040fb"].map(col => (
                <div key={col} style={{ width: 28, height: 28, borderRadius: "50%", background: col, cursor: "pointer", border: col === ACCENT ? "2px solid #fff" : "2px solid transparent", boxShadow: `0 0 8px ${col}60`, transition: "transform .2s" }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.2)"} onMouseLeave={e => e.currentTarget.style.transform = "none"} />
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "facturation" && (
        <div style={{ maxWidth: 520 }}>
          <div style={{ background: `linear-gradient(135deg,${currentPlan.color}12,rgba(0,0,0,.5))`, border: `1px solid ${currentPlan.color}40`, borderRadius: 16, padding: "22px 20px", marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 11, color: currentPlan.color, fontWeight: 800, letterSpacing: ".12em", marginBottom: 6 }}>PLAN ACTUEL — {currentPlan.label}</div>
                <div style={{ fontSize: 30, fontWeight: 900, color: "#fff" }}>{currentPlan.price}€<span style={{ fontSize: 14, color: "rgba(255,255,255,.4)", fontWeight: 400 }}>/mois</span></div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)", marginBottom: 4 }}>Quota journalier</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: currentPlan.color }}>{currentPlan.daily === 999 ? "Illimité" : `${currentPlan.daily} req/jour`}</div>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)", fontWeight: 700, letterSpacing: ".1em", marginBottom: 12 }}>CHANGER DE PLAN</div>
            <div style={{ display: "flex", gap: 10 }}>
              {Object.values(PLANS_CONFIG).filter(p => p.label !== currentPlan.label).map(p => (
                <div key={p.label} onClick={() => handleCheckout(p.label)} style={{ flex: 1, background: `${p.color}0d`, border: `1px solid ${p.color}35`, borderRadius: 14, padding: "16px 12px", cursor: "pointer", transition: "all .2s", textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: p.color, marginBottom: 4 }}>{p.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: "#fff", marginBottom: 2 }}>{p.price}€</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,.4)", marginBottom: 8 }}>{p.daily === 999 ? "Illimité" : `${p.daily} req/jour`}</div>
                  <div style={{ fontSize: 11, color: p.color, fontWeight: 700 }}>{p.price > currentPlan.price ? "Upgrader →" : "Downgrader"}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)", fontWeight: 700, letterSpacing: ".1em", marginBottom: 12 }}>HISTORIQUE FACTURATION</div>
          {[{ label: "15 mars 2025", amount: `${currentPlan.price},00€`, status: "Payé" }, { label: "15 fév. 2025", amount: `${currentPlan.price},00€`, status: "Payé" }, { label: "15 jan. 2025", amount: `${currentPlan.price},00€`, status: "Payé" }].map((inv, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,.6)" }}>{inv.label}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{inv.amount}</span>
                <span style={{ fontSize: 10, color: "#39ff14", background: "#39ff1415", border: "1px solid #39ff1430", borderRadius: 6, padding: "2px 8px" }}>{inv.status}</span>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 18 }}>
            <button style={{ padding: "10px 18px", background: "transparent", border: "1px solid rgba(255,51,102,.3)", borderRadius: 10, color: "rgba(255,51,102,.6)", fontSize: 12, cursor: "pointer" }}>Annuler l&apos;abonnement</button>
          </div>
        </div>
      )}
    </div>
  );
}
