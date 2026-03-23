"use client";
import { useEffect, useState } from "react";
import { ACCENT, BORDER } from "@/lib/constants";
import Link from "next/link";
import ParticleBg from "@/components/effects/ParticleBg";

const SUBTITLES = [
  "47 outils IA. 1 plateforme. Dès 7€/mois.",
  "Automatise, crée, code — tout avec l'IA.",
  "L'alternative française à tout le reste.",
];

export default function HeroSection() {
  const [subIdx, setSubIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const text = SUBTITLES[subIdx];
    if (typing) {
      if (displayed.length < text.length) {
        const t = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), 35);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 2000);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 20);
        return () => clearTimeout(t);
      } else {
        setSubIdx((subIdx + 1) % SUBTITLES.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, subIdx]);

  const stats = [
    { value: "47+", label: "Outils IA" },
    { value: "7€", label: "Prix départ" },
    { value: "3", label: "Plans" },
    { value: "100%", label: "RGPD EU" },
  ];

  return (
    <section style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", textAlign: "center",
      padding: "120px 24px 60px", position: "relative", zIndex: 1,
    }}>
      <ParticleBg density={55} />

      {/* Glow orbs */}
      <div style={{ position: "absolute", top: "10%", left: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,212,255,0.1),transparent 70%)", filter: "blur(80px)", pointerEvents: "none", animation: "floatY 8s ease infinite" }} />
      <div style={{ position: "absolute", bottom: "5%", right: "-5%", width: 450, height: 450, borderRadius: "50%", background: "radial-gradient(circle,rgba(99,102,241,0.1),transparent 70%)", filter: "blur(80px)", pointerEvents: "none", animation: "floatY2 10s ease infinite" }} />

      <div className="reveal" style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "6px 16px", borderRadius: 20,
        border: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.03)",
        marginBottom: 32, fontSize: 12, color: "rgba(255,255,255,0.5)",
        position: "relative", zIndex: 2,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#39ff14", animation: "pulse 2s infinite" }} />
        Plateforme IA Française — 100% RGPD
      </div>

      <h1 className="reveal reveal-1" style={{
        fontFamily: "var(--font-syne)", fontWeight: 800,
        fontSize: "clamp(40px, 7vw, 80px)", lineHeight: 1.05,
        maxWidth: 900, marginBottom: 24, position: "relative", zIndex: 2,
      }}>
        <span className="gradient-text">L&apos;IA ultime</span>
        <br />
        pour tout créer
      </h1>

      <div className="reveal reveal-2" style={{
        fontSize: "clamp(16px, 2.5vw, 22px)", color: "rgba(255,255,255,0.5)",
        minHeight: 34, marginBottom: 40, fontWeight: 300,
        position: "relative", zIndex: 2,
      }}>
        {displayed}
        <span style={{ animation: "blink 1s infinite", color: ACCENT }}>|</span>
      </div>

      <div className="reveal reveal-3" style={{ display: "flex", gap: 14, marginBottom: 56, flexWrap: "wrap", justifyContent: "center", position: "relative", zIndex: 2 }}>
        <Link href="/onboarding" className="hover-lift" style={{
          background: `linear-gradient(135deg, ${ACCENT}, #7c3aed)`,
          color: "#fff", fontSize: 15, fontWeight: 600,
          textDecoration: "none", padding: "14px 36px", borderRadius: 12,
          boxShadow: "0 0 40px rgba(0,212,255,0.3)",
        }}>Commencer gratuitement</Link>
        <a href="#comparatif" className="hover-lift" style={{
          background: "rgba(255,255,255,0.06)", color: "#fff",
          fontSize: 15, fontWeight: 500, textDecoration: "none",
          padding: "14px 36px", borderRadius: 12,
          border: `1px solid ${BORDER}`,
        }}>Voir le comparatif</a>
      </div>

      <div className="reveal reveal-4" style={{
        display: "flex", gap: 1, borderRadius: 16, overflow: "hidden",
        border: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.02)",
        position: "relative", zIndex: 2,
      }}>
        {stats.map((s, i) => (
          <div key={s.label} style={{
            padding: "20px 32px", textAlign: "center",
            borderRight: i < stats.length - 1 ? `1px solid ${BORDER}` : "none",
          }}>
            <div style={{ fontSize: 24, fontWeight: 800, fontFamily: "var(--font-syne)", color: ACCENT }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
