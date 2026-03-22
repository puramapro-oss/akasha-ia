"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ACCENT, BG, BORDER } from "@/lib/constants";
import ParticleBg from "@/components/effects/ParticleBg";

const STEPS = [
  {
    title: "Tu veux utiliser l'IA pour…",
    subtitle: "Choisis tes cas d'usage principaux",
    multi: true,
    options: [
      { id: "content", icon: "✍️", label: "Créer du contenu", desc: "Posts, articles, newsletters" },
      { id: "code", icon: "💻", label: "Coder & développer", desc: "Générer, debug, déployer du code" },
      { id: "design", icon: "🎨", label: "Design & créatif", desc: "Images, vidéos, audio" },
      { id: "business", icon: "📊", label: "Business & analyse", desc: "Rapports, data, stratégie" },
      { id: "automation", icon: "⟳", label: "Automatiser", desc: "Workflows, emails, tâches" },
      { id: "support", icon: "🎧", label: "Support client", desc: "Chatbots, FAQ, réponses auto" },
    ],
  },
  {
    title: "Ton niveau avec l'IA ?",
    subtitle: "On adapte l'expérience pour toi",
    multi: false,
    options: [
      { id: "beginner", icon: "🌱", label: "Débutant", desc: "Je découvre, j'ai besoin d'être guidé" },
      { id: "intermediate", icon: "⚡", label: "Intermédiaire", desc: "J'utilise ChatGPT / Midjourney parfois" },
      { id: "advanced", icon: "🚀", label: "Avancé", desc: "J'utilise l'IA au quotidien pour bosser" },
      { id: "expert", icon: "🧠", label: "Expert", desc: "API, agents, prompting avancé, no-code" },
    ],
  },
  {
    title: "Le plan idéal pour toi",
    subtitle: "Tu pourras changer à tout moment",
    multi: false,
    options: [
      { id: "SPARK", icon: "✨", label: "SPARK — 7€/mois", desc: "5 req/jour · 20 modèles · Idéal pour tester", color: "#00d4ff" },
      { id: "NOVA", icon: "⭐", label: "NOVA — 17€/mois", desc: "20 req/jour · 47 outils · Studio + Agents", color: "#ffd700" },
      { id: "APEX", icon: "💎", label: "APEX — 37€/mois", desc: "Illimité · GPU · Équipe 10 users · SLA", color: "#39ff14" },
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
      // Terminé → inscription avec le plan choisi
      const plan = selected[0] || "NOVA";
      router.push(`/inscription?plan=${plan}`);
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
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#00d4ff,#6366f1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, boxShadow: "0 0 20px #00d4ff60" }}>⬡</div>
            <span style={{ fontSize: 20, fontWeight: 800 }}>AKASHA<span style={{ color: ACCENT }}>AI</span></span>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ display: "flex", gap: 6, marginBottom: 32 }}>
          {STEPS.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= step ? "linear-gradient(90deg,#00d4ff,#6366f1)" : "rgba(255,255,255,0.08)", transition: "background .4s" }} />
          ))}
        </div>

        {/* Step content */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 6 }}>{current.title}</h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.45)" }}>{current.subtitle}</p>
          {current.multi && <p style={{ fontSize: 12, color: ACCENT, marginTop: 6 }}>Plusieurs choix possibles</p>}
        </div>

        {/* Options grid */}
        <div style={{ display: "grid", gridTemplateColumns: current.options.length <= 4 ? "1fr 1fr" : "1fr 1fr 1fr", gap: 10, marginBottom: 28 }}>
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
                  borderRadius: 16,
                  cursor: "pointer",
                  transition: "all .25s",
                  textAlign: "center",
                  transform: isSelected ? "scale(1.02)" : "none",
                  boxShadow: isSelected ? `0 0 20px ${optColor}25` : "none",
                }}
                onMouseEnter={e => { if (!isSelected) e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
                onMouseLeave={e => { if (!isSelected) e.currentTarget.style.borderColor = BORDER; }}
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
              ← Retour
            </button>
          ) : (
            <Link href="/" style={{ flex: "0 0 auto", padding: "14px 24px", background: "rgba(255,255,255,.05)", border: `1px solid ${BORDER}`, borderRadius: 12, color: "rgba(255,255,255,.6)", fontSize: 14, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center" }}>
              ← Accueil
            </Link>
          )}
          <button
            onClick={next}
            disabled={!canContinue}
            style={{
              flex: 1,
              padding: "14px",
              background: canContinue ? "linear-gradient(135deg,#00d4ff,#6366f1)" : "rgba(255,255,255,.08)",
              border: "none",
              borderRadius: 12,
              color: canContinue ? "#fff" : "rgba(255,255,255,.3)",
              fontSize: 15,
              fontWeight: 800,
              cursor: canContinue ? "pointer" : "not-allowed",
              boxShadow: canContinue ? "0 0 30px #00d4ff40" : "none",
              transition: "all .2s",
            }}
          >
            {step < STEPS.length - 1 ? "Continuer →" : "Créer mon compte →"}
          </button>
        </div>

        {/* Skip */}
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <span onClick={() => router.push("/inscription")} style={{ fontSize: 12, color: "rgba(255,255,255,.25)", cursor: "pointer", transition: "color .2s" }} onMouseEnter={e => (e.target as HTMLElement).style.color = "rgba(255,255,255,.5)"} onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(255,255,255,.25)"}>
            Passer cette étape
          </span>
        </div>
        <div style={{ textAlign: "center", marginTop: 12 }}>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,.35)" }}>Déjà un compte ? </span>
          <Link href="/connexion" style={{ fontSize: 13, color: ACCENT, fontWeight: 600, textDecoration: "none" }}>Se connecter</Link>
        </div>
      </div>
    </div>
  );
}
