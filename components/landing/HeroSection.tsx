"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ParticleBg from "@/components/effects/ParticleBg";
import GridBg from "@/components/effects/GridBg";
import LiveTicker from "./LiveTicker";
import ComparisonTable from "./ComparisonTable";
import { ACCENT } from "@/lib/constants";

export default function HeroSection() {
  const [typed, setTyped] = useState("");
  const [blink, setBlink] = useState(true);
  const full = "47 outils IA. 1 abonnement. Dès 7€/mois.";

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => { setTyped(full.slice(0, i + 1)); i++; if (i === full.length) clearInterval(id); }, 55);
    const b = setInterval(() => setBlink(v => !v), 500);
    return () => { clearInterval(id); clearInterval(b); };
  }, []);

  return (
    <section style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 40px 60px", overflow: "hidden" }}>
      <ParticleBg density={55} />
      <GridBg />
      <div style={{ position: "absolute", top: "10%", left: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,212,255,0.12),transparent 70%)", filter: "blur(80px)", pointerEvents: "none", animation: "floatY 8s ease infinite" }} />
      <div style={{ position: "absolute", bottom: "5%", right: "-5%", width: 450, height: 450, borderRadius: "50%", background: "radial-gradient(circle,rgba(99,102,241,0.12),transparent 70%)", filter: "blur(80px)", pointerEvents: "none", animation: "floatY2 10s ease infinite" }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,51,102,0.04),transparent 70%)", filter: "blur(100px)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 48, maxWidth: 1200, width: "100%", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 480px", maxWidth: 600 }}>
          <div className="reveal reveal-1" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.35)", borderRadius: 30, padding: "7px 18px", marginBottom: 28, animation: "borderGlow 3s ease infinite, revealUp 0.8s ease both" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#39ff14", boxShadow: "0 0 10px #39ff14", display: "inline-block", animation: "pulse 1.5s infinite" }} />
            <span style={{ fontSize: 11, color: ACCENT, fontWeight: 800, letterSpacing: ".12em" }}>47 OUTILS IA · 1 ABONNEMENT · DÈS 7€/MOIS</span>
          </div>

          <h1 className="reveal reveal-2" style={{ fontSize: "clamp(36px,5.5vw,78px)", lineHeight: 1.04, fontWeight: 800, letterSpacing: "-.03em", marginBottom: 20 }}>
            <span style={{ color: "#fff" }}>La plateforme IA</span><br />
            <span style={{ backgroundImage: "linear-gradient(90deg,#00d4ff 0%,#6366f1 35%,#ff3366 65%,#ffd700 100%)", backgroundSize: "300%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "gradMove 4s ease infinite" }}>la plus puissante</span><br />
            <span style={{ color: "#fff" }}>du marché.</span>
          </h1>

          <p className="reveal reveal-3" style={{ fontSize: "clamp(14px,1.8vw,18px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.85, marginBottom: 36, maxWidth: 500 }}>
            {typed}<span style={{ opacity: blink ? 1 : 0, color: ACCENT }}>|</span>
          </p>

          <div className="reveal reveal-4" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
            <Link href="/onboarding" style={{ padding: "16px 36px", background: "linear-gradient(135deg,#00d4ff,#6366f1,#00d4ff)", backgroundSize: "200%", border: "none", borderRadius: 14, color: "#fff", fontSize: 15, fontWeight: 800, cursor: "pointer", boxShadow: "0 0 50px rgba(0,212,255,0.5), 0 4px 20px rgba(0,0,0,0.4)", letterSpacing: ".03em", animation: "shimmerBtn 3s linear infinite", textDecoration: "none", display: "inline-block" }}>
              ⚡ Commencer Gratuitement
            </Link>
            <Link href="/connexion" style={{ padding: "16px 32px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 14, color: "rgba(255,255,255,0.8)", fontSize: 15, fontWeight: 600, cursor: "pointer", backdropFilter: "blur(12px)", textDecoration: "none", display: "inline-block" }}>
              Se Connecter →
            </Link>
          </div>

          <div className="reveal reveal-5">
            <LiveTicker />
          </div>

          <div style={{ display: "flex", gap: 36, marginTop: 32, flexWrap: "wrap" }}>
            {[{ v: "47+", l: "Outils IA", c: "#00d4ff" }, { v: "7€", l: "Prix départ", c: "#ffd700" }, { v: "3", l: "Plans dispo", c: "#39ff14" }, { v: "100%", l: "RGPD EU", c: "#e040fb" }].map((s, i) => (
              <div key={s.l} style={{ animation: `revealUp 0.8s cubic-bezier(.23,1,.32,1) ${0.6 + i * 0.1}s both` }}>
                <div style={{ fontSize: "clamp(20px,3vw,34px)", fontWeight: 900, color: "#fff", lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontSize: 11, color: s.c, letterSpacing: ".1em", textTransform: "uppercase", marginTop: 4, fontWeight: 700 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <ComparisonTable />
      </div>
    </section>
  );
}
