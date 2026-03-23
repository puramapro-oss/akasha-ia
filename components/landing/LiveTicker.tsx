"use client";
import { BORDER } from "@/lib/constants";

const MESSAGES = [
  "\u26A1 n8n + Make + Zapier int\u00e9gr\u00e9s",
  "\uD83C\uDFAC Runway Gen-4, Kling 2.0, HeyGen",
  "\uD83D\uDCBB Cursor Agent + Claude Code + v0.dev",
  "\uD83C\uDFA4 ElevenLabs v3 + Suno v4 + Udio 2",
  "\uD83E\uDD16 Agents autonomes avec AutoAgent",
  "\u2601\uFE0F Banana GPU Cloud inclus",
  "\uD83D\uDD12 100% RGPD \u2014 H\u00e9berg\u00e9 en Europe",
  "\uD83C\uDFA8 Midjourney v7 + FLUX Pro + DALL\u00B7E 4",
  "\uD83D\uDCCA Analytics temps r\u00e9el",
  "\uD83D\uDE80 D\u00e8s 7\u20AC/mois \u2014 47 outils IA",
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
