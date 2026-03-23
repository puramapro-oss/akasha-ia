"use client";
import { useState, useEffect } from "react";
import { ACCENT, BG, BORDER } from "@/lib/constants";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 32px", height: 64,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(6,6,15,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? `1px solid ${BORDER}` : "1px solid transparent",
      transition: "all .3s ease",
    }}>
      <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: `linear-gradient(135deg, ${ACCENT}, #7c3aed)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16, fontWeight: 800, color: "#fff",
        }}>A</div>
        <span style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 18, color: "#fff", letterSpacing: "-.01em" }}>
          AKASHA <span style={{ color: ACCENT }}>AI</span>
        </span>
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {[
          { label: "Fonctionnalités", href: "#fonctionnalites" },
          { label: "Comparatif", href: "#comparatif" },
          { label: "Pricing", href: "#pricing" },
        ].map((l) => (
          <a key={l.label} href={l.href} style={{
            color: "rgba(255,255,255,0.55)", fontSize: 13, fontWeight: 500,
            textDecoration: "none", padding: "6px 14px", borderRadius: 6,
            transition: "color .2s",
          }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#fff")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.55)")}
          >{l.label}</a>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Link href="/connexion" style={{
          color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: 500,
          textDecoration: "none", padding: "8px 18px", borderRadius: 8,
          border: `1px solid ${BORDER}`, transition: "all .2s",
        }}>Connexion</Link>
        <Link href="/onboarding" style={{
          background: ACCENT, color: BG, fontSize: 13, fontWeight: 600,
          textDecoration: "none", padding: "8px 20px", borderRadius: 8,
          transition: "all .2s",
        }}>Essai Gratuit</Link>
      </div>
    </nav>
  );
}
