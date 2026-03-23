"use client";
import Link from "next/link";
import { ACCENT } from "@/lib/constants";

export default function CTASection() {
  return (
    <section style={{ padding: "80px 24px 60px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 350, background: "radial-gradient(ellipse,rgba(0,212,255,0.1),transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
      <div className="hover-lift" style={{
        maxWidth: 900, margin: "0 auto",
        background: "linear-gradient(135deg,rgba(0,212,255,0.08),rgba(99,102,241,0.06))",
        border: `1px solid rgba(0,212,255,0.2)`, borderRadius: 28,
        padding: "60px 48px", textAlign: "center",
        position: "relative", zIndex: 2,
      }}>
        <p style={{ fontSize: 11, letterSpacing: ".25em", color: ACCENT, fontWeight: 800, marginBottom: 14, textTransform: "uppercase" }}>
          La plateforme IA la plus complète du marché
        </p>
        <h2 style={{ fontSize: "clamp(26px,5vw,52px)", fontWeight: 800, marginBottom: 14, lineHeight: 1.1 }}>
          Prêt à tout créer<br />avec l&apos;IA ?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, marginBottom: 28, maxWidth: 420, margin: "0 auto 28px" }}>
          47 outils IA. Dès 7€/mois. Aucune carte bancaire requise.
        </p>
        <Link href="/onboarding" style={{
          display: "inline-block", padding: "17px 44px",
          background: `linear-gradient(135deg,${ACCENT},#7c3aed)`,
          borderRadius: 14, color: "#fff", fontSize: 16, fontWeight: 800,
          textDecoration: "none", boxShadow: "0 0 50px rgba(0,212,255,0.4)",
        }}>
          Commencer Gratuitement
        </Link>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", marginTop: 16 }}>
          {"✓"} Sans engagement · {"✓"} RGPD · {"✓"} Hébergé en France
        </p>
      </div>
    </section>
  );
}
