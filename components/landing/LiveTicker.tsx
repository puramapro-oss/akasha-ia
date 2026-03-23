"use client";
import { BORDER } from "@/lib/constants";

const MESSAGES = [
  "⚡ n8n + Make + Zapier intégrés",
  "🎬 Runway Gen-4, Kling 2.0, HeyGen",
  "💻 Cursor Agent + Claude Code + v0.dev",
  "🎤 ElevenLabs v3 + Suno v4 + Udio 2",
  "🤖 Agents autonomes avec AutoAgent",
  "☁ Banana GPU Cloud inclus",
  "🔒 100% RGPD â Hébergé en Europe",
  "🎨 Midjourney v7 + FLUX Pro + DALLÂ·E 4",
  "📊 Analytics temps réel",
  "🚀 Dès 7â¬/mois â 47 outils IA",
];

export default function LiveTicker() {
  const doubled = [...MESSAGES, ...MESSAGES];

  return (
    <div style={{
      overflow: "hidden", padding: "14px 0",
      borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`,
      background: "rgba(255,255,255,0.015)",
    }}>
      <div style={{
        display: "flex", gap: 40, whiteSpace: "nowrap",
        animation: "ticker 40s linear infinite",
        width: "max-content",
      }}>
        {doubled.map((msg, i) => (
          <span key={i} style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", letterSpacing: ".02em" }}>
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}
