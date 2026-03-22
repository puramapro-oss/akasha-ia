import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", background: "#06060f", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 20, padding: 40 }}>
      <div style={{ width: 56, height: 56, borderRadius: 14, background: "linear-gradient(135deg,#00d4ff,#6366f1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, boxShadow: "0 0 30px #00d4ff50" }}>⬡</div>
      <h1 style={{ fontSize: 72, fontWeight: 900, color: "#fff", lineHeight: 1 }}>404</h1>
      <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", textAlign: "center", maxWidth: 400 }}>
        Cette page n&apos;existe pas ou a été déplacée.
      </p>
      <Link href="/" style={{ padding: "12px 28px", background: "linear-gradient(135deg,#00d4ff,#6366f1)", border: "none", borderRadius: 12, color: "#fff", fontSize: 14, fontWeight: 700, textDecoration: "none", boxShadow: "0 0 20px #00d4ff40" }}>
        ← Retour à l&apos;accueil
      </Link>
    </div>
  );
}
