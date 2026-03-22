"use client";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div style={{ minHeight: "100vh", background: "#06060f", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 20, padding: 40 }}>
      <div style={{ width: 56, height: 56, borderRadius: 14, background: "rgba(255,51,102,0.15)", border: "1px solid rgba(255,51,102,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>⚠️</div>
      <h1 style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>Une erreur est survenue</h1>
      <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", textAlign: "center", maxWidth: 420, lineHeight: 1.7 }}>
        {error.message || "Quelque chose s'est mal passé. Réessaie ou contacte le support."}
      </p>
      <button onClick={reset} style={{ padding: "12px 28px", background: "linear-gradient(135deg,#00d4ff,#6366f1)", border: "none", borderRadius: 12, color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: "0 0 20px #00d4ff40" }}>
        Réessayer
      </button>
    </div>
  );
}
