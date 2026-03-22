"use client";
import Link from "next/link";
import Card3D from "@/components/effects/Card3D";
import { ACCENT } from "@/lib/constants";

export default function CTASection() {
  return (
    <section style={{ padding: "80px 40px 60px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 350, background: "radial-gradient(ellipse,rgba(0,212,255,0.1),transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
      <Card3D intensity={4} style={{ maxWidth: 900, margin: "0 auto", background: "linear-gradient(135deg,rgba(0,212,255,0.08),rgba(99,102,241,0.06))", border: "1px solid rgba(0,212,255,0.2)", borderRadius: 28, padding: "60px 48px", textAlign: "center", position: "relative", zIndex: 2 }}>
        <p style={{ fontSize: 11, letterSpacing: ".25em", color: ACCENT, fontWeight: 800, marginBottom: 14, textTransform: "uppercase" }}>⚡ La plateforme IA la plus complète du marché</p>
        <h2 style={{ fontSize: "clamp(26px,5vw,58px)", fontWeight: 800, marginBottom: 14, lineHeight: 1.1 }}>Prêt à dominer<br />avec l&apos;IA ?</h2>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, marginBottom: 32, maxWidth: 420, margin: "0 auto 28px" }}>47 outils IA. 7€/mois. Aucune carte bancaire requise.</p>
        <Link href="/onboarding" style={{ display: "inline-block", padding: "17px 44px", background: "linear-gradient(135deg,#00d4ff,#6366f1,#00d4ff)", backgroundSize: "200%", border: "none", borderRadius: 14, color: "#fff", fontSize: 16, fontWeight: 800, cursor: "pointer", boxShadow: "0 0 60px rgba(0,212,255,0.5)", letterSpacing: ".04em", animation: "shimmerBtn 3s linear infinite", textDecoration: "none" }}>
          Commencer Gratuitement — C&apos;est Gratuit ⚡
        </Link>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", marginTop: 16 }}>✓ Sans engagement · ✓ RGPD · ✓ Hébergé en France 🇫🇷</p>
      </Card3D>
    </section>
  );
}
