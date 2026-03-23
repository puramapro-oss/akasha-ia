"use client";
import { useState } from "react";
import { BG, BORDER } from "@/lib/constants";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import LiveTicker from "@/components/landing/LiveTicker";
import FeaturesSection from "@/components/landing/FeaturesSection";
import ComparisonTable from "@/components/landing/ComparisonTable";
import DashboardMockup from "@/components/landing/DashboardMockup";
import PricingSection from "@/components/landing/PricingSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const onMouseMove = (e: React.MouseEvent) => setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });

  return (
    <div style={{ minHeight: "100vh", background: BG, color: "#fff", overflowX: "hidden" }} onMouseMove={onMouseMove}>
      {/* Mouse-following glow */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,212,255,0.06),transparent 70%)", filter: "blur(40px)", left: `calc(${mousePos.x * 100}% - 300px)`, top: `calc(${mousePos.y * 100}% - 300px)`, transition: "left .8s ease, top .8s ease" }} />
      </div>

      <Navbar />
      <HeroSection />
      <LiveTicker />

      {/* Logos */}
      <section style={{ padding: "32px 0", borderBottom: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.015)", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 14 }}>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: ".15em", textTransform: "uppercase" }}>Int\u00e8gre les leaders mondiaux de l&apos;IA</span>
        </div>
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
          {[
            { n: "OpenAI", c: "#10a37f" }, { n: "Anthropic", c: "#cc785c" }, { n: "Google", c: "#4285f4" },
            { n: "Meta", c: "#3b82f6" }, { n: "Mistral", c: "#ff7000" }, { n: "xAI", c: "#e5e7eb" },
            { n: "ElevenLabs", c: "#ff6b35" }, { n: "Runway", c: "#ff0080" }, { n: "Suno", c: "#ff4081" }, { n: "n8n", c: "#ea4b71" },
          ].map(l => (
            <div key={l.n} style={{ fontSize: 13, fontWeight: 800, color: "rgba(255,255,255,0.22)", letterSpacing: ".04em", transition: "color .2s", cursor: "default", whiteSpace: "nowrap" }}
              onMouseEnter={e => ((e.target as HTMLElement).style.color = l.c)}
              onMouseLeave={e => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.22)")}
            >{l.n}</div>
          ))}
        </div>
      </section>

      <FeaturesSection />
      <ComparisonTable />
      <DashboardMockup />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
}
