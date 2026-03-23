"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ACCENT, BG, BORDER } from "@/lib/constants";
import ParticleBg from "@/components/effects/ParticleBg";

const STEPS = [
  {
    title: "Tu veux utiliser l\u2019IA pour\u2026",
    subtitle: "Choisis tes cas d\u2019usage principaux",
    multi: true,
    options: [
      { id: "content", icon: "\u270D\uFE0F", label: "Cr\u00e9er du contenu", desc: "Posts, articles, newsletters" },
      { id: "code", icon: "\uD83D\uDCBB", label: "Coder & d\u00e9velopper", desc: "G\u00e9n\u00e9rer, debug, d\u00e9ployer" },
      { id: "design", icon: "\uD83C\uDFA8", label: "Design & cr\u00e9atif", desc: "Images, vid\u00e9os, audio" },
      { id: "automation", icon: "\u27F3", label: "Automatiser", desc: "Workflows, emails, t\u00e2ches" },
    ],
  },
  {
    title: "Ton niveau avec l\u2019IA ?",
    subtitle: "On adapte l\u2019exp\u00e9rience pour toi",
    multi: false,
    options: [
      { id: "beginner", icon: "\uD83C\uDF31", label: "D\u00e9butant", desc: "Je d\u00e9couvre, j\u2019ai besoin d\u2019\u00eatre guid\u00e9" },
      { id: "intermediate", icon: "\u26A1", label: "Interm\u00e9diaire", desc: "J\u2019utilise ChatGPT / Midjourney parfois" },
      { id: "expert", icon: "\uD83E\uDDE0", label: "Expert", desc: "API, agents, prompting avanc\u00e9" },
    ],
  },
  {
    title: "Quel plan t\u2019int\u00e9resse ?",
    subtitle: "Tu pourras changer \u00e0 tout moment",
    multi: false,
    options: [
      { id: "AUTOMATE", icon: "\u26A1", label: "AUTOMATE \u2014 d\u00e8s 7\u20AC/mois", desc: "n8n, Make, Zapier, agents \u2014 automatise tout", color: "#00d4ff" },
      { id: "CREATE", icon: "\uD83C\uDFAC", label: "CREATE \u2014 d\u00e8s 7\u20AC/mois", desc: "Images, vid\u00e9os, audio \u2014 cr\u00e9e sans limites", color: "#ff6b9d" },
      { id: "BUILD", icon: "\uD83D\uDCBB", label: "BUILD \u2014 d\u00e8s 7\u20AC/mois", desc: "Claude, Cursor, v0 \u2014 code et d\u00e9ploie", color: "#39ff14" },
      { id: "COMPLET", icon: "\uD83C\uDF0C", label: "COMPLET \u2014 d\u00e8s 22\u20AC/mois", desc: "Les 47 outils AKASHA AI complets", color: "#ffd700" },
    ],
  },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const router = useRouter();
  const current = STEPS[step];
  const selected = answers[step] || [];

  const toggle = (id: string) => {
    if (current.multi) {
      setAnswers(p => ({
        ...p,
        [step]: selected.includes(id) ? selected.filter(x => x !== id) : [...selected, id],
      }));
    } else {
      setAnswers(p => ({ ...p, [step]: [id] }));
    }
  };

  const canContinue = selected.length > 0;

  const next = () => {
    if (step < STEPS.length - 1) {
      setStep(s => s + 1);
    } else {
      const plan = selected[0] || "AUTOMATE";
      router.push(`/inscription?plan=${plan}_essentiel`);
    }
  };

  const back = () => {
    if (step > 0) setStep(s => s - 1);
  };

  return (
    <div style={{ minHeight: "100vh", background: BG, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, position: "relative", overflow: "hidden" }}>
      <ParticleBg density={25} />

      <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 560 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg,${ACCENT},#7c3aed)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 800, color: "#fff" }}>A</div>
            <span style={{ fontSize: 20, fontWeight: 800 }}>AKASHA<span style={{ color: ACCENT }}>AI</span></span>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ display: "flex", gap: 6, marginBottom: 32 }}>
          {STEPS.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= step ? `linear-gradient(90deg,${ACCENT},#7c3aed)` : "rgba(255,255,255,0.08)", transition: "background .4s" }} />
          ))}
        </div>

        {/* Step content */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 6 }}>{current.title}</h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.45)" }}>{current.subtitle}</p>
          {current.multi && <p style={{ fontSize: 12, color: ACCENT, marginTop: 6 }}>Plusieurs choix possibles</p>}
        </div>

        {/* Options grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 28 }}>
          {current.options.map(opt => {
            const isSelected = selected.includes(opt.id);
            const optColor = (opt as { color?: string }).color || ACCENT;
            return (
              <div
                key={opt.id}
                onClick={() => toggle(opt.id)}
                style={{
                  padding: "18px 16px",
                  background: isSelected ? `${optColor}15` : "rgba(255,255,255,0.03)",
                  border: `2px solid ${isSelected ? optColor : BORDER}`,
                  borderRadius: 16, cursor: "pointer", transition: "all .25s",
                  textAlign: "center",
                  transform: isSelected ? "scale(1.02)" : "none",
                  boxShadow: isSelected ? `0 0 20px ${optColor}25` : "none",
                }}
              >
                <div style={{ fontSize: 26, marginBottom: 8 }}>{opt.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: isSelected ? "#fff" : "rgba(255,255,255,.8)", marginBottom: 4 }}>{opt.label}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)", lineHeight: 1.4 }}>{opt.desc}</div>
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", gap: 10 }}>
          {step > 0 ? (
            <button onClick={back} style={{ flex: "0 0 auto", padding: "14px 24px", background: "rgba(255,255,255,.05)", border: `1px solid ${BORDER}`, borderRadius: 12, color: "rgba(255,255,255,.6)", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
              \u2190 Retour
            </button>
          ) : (
            <Link href="/" style={{ flex: "0 0 auto", padding: "14px 24px", background: "rgba(255,255,255,.05)", border: `1px solid ${BORDER}`, borderRadius: 12, color: "rgba(255,255,255,.6)", fontSize: 14, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center" }}>
              \u2190 Accueil
            </Link>
          )}
          <button
            onClick={next}
            disabled={!canContinue}
            style={{
              flex: 1, padding: "14px",
              background: canContinue ? `linear-gradient(135deg,${ACCENT},#7c3aed)` : "rgba(255,255,255,.08)",
              border: "none", borderRadius: 12,
              color: canContinue ? "#fff" : "rgba(255,255,255,.3)",
              fontSize: 15, fontWeight: 800,
              cursor: canContinue ? "pointer" : "not-allowed",
              boxShadow: canContinue ? "0 0 30px #00d4ff40" : "none",
              transition: "all .2s",
            }}
          >
            {step < STEPS.length - 1 ? "Continuer \u2192" : "Cr\u00e9er mon compte \u2192"}
          </button>
        </div>

        {/* Skip */}
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <span onClick={() => router.push("/inscription")} style={{ fontSize: 12, color: "rgba(255,255,255,.25)", cursor: "pointer", transition: "color .2s" }}
            onMouseEnter={e => ((e.target as HTMLElement).style.color = "rgba(255,255,255,.5)")}
            onMouseLeave={e => ((e.target as HTMLElement).style.color = "rgba(255,255,255,.25)")}
          >Passer cette \u00e9tape</span>
        </div>
        <div style={{ textAlign: "center", marginTop: 12 }}>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,.35)" }}>D\u00e9j\u00e0 un compte ? </span>
          <Link href="/connexion" style={{ fontSize: 13, color: ACCENT, fontWeight: 600, textDecoration: "none" }}>Se connecter</Link>
        </div>
      </div>
    </div>
  );
}
