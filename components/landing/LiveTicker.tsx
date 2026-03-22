"use client";
import { useState, useEffect } from "react";
import { BORDER } from "@/lib/constants";

const events = [
  "🇫🇷 Bienvenue sur AKASHA AI — 47 outils IA en un abonnement",
  "⚡ Génère une vidéo 4K avec Sora depuis l'onglet Studio",
  "💻 Code, debug et déploie avec Cursor IDE intégré",
  "🤖 Configure tes agents autonomes dans l'onglet Agents",
  "🎵 Crée une musique complète avec Suno en quelques secondes",
  "⟳ Automatise tes workflows avec n8n, Make et Zapier intégrés",
  "🔗 Accède à toute la plateforme via 1 seule clé API universelle",
  "🛡️ Données hébergées en France · 100% RGPD compliant",
];

export default function LiveTicker() {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);
  useEffect(() => {
    const id = setInterval(() => {
      setFade(false);
      setTimeout(() => { setIdx(i => (i + 1) % events.length); setFade(true); }, 300);
    }, 3000);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 18px", background: "rgba(255,255,255,0.03)", border: `1px solid ${BORDER}`, borderRadius: 30, fontSize: 12, color: "rgba(255,255,255,0.6)", maxWidth: 500, width: "100%" }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#39ff14", boxShadow: "0 0 8px #39ff14", flexShrink: 0, animation: "pulse 1.5s infinite", display: "inline-block" }} />
      <span style={{ opacity: fade ? 1 : 0, transition: "opacity 0.3s", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{events[idx]}</span>
    </div>
  );
}
