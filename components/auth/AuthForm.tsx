"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSupabaseClient } from "@/lib/supabase/client";
import { ACCENT, BG, BORDER } from "@/lib/constants";
import ParticleBg from "@/components/effects/ParticleBg";

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const router = useRouter();
  const isLogin = mode === "login";

  const validate = () => {
    const e: Record<string, string> = {};
    if (!isLogin && !form.name.trim()) e.name = "Prénom requis";
    if (!form.email.includes("@")) e.email = "Email invalide";
    if (form.password.length < 6) e.password = "6 caractères minimum";
    if (!isLogin && form.password !== form.confirm) e.confirm = "Les mots de passe ne correspondent pas";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    setGlobalError("");

    try {
      if (isLogin) {
        const supabase = getSupabaseClient();
        const { error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });
        if (error) { setGlobalError(error.message); setLoading(false); return; }
        router.push("/dashboard");
        router.refresh();
      } else {
        // Register via API route
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
        });
        const data = await res.json();
        if (!res.ok) { setGlobalError(data.error); setLoading(false); return; }

        // Auto-login after registration
        const supabase = getSupabaseClient();
        const { error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });
        if (error) { setGlobalError(error.message); setLoading(false); return; }
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setGlobalError("Erreur de connexion");
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    const supabase = getSupabaseClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  const Field = ({ id, label, type = "text", placeholder }: { id: string; label: string; type?: string; placeholder: string }) => (
    <div style={{ marginBottom: 16 }}>
      <label style={{ fontSize: 12, color: "rgba(255,255,255,.5)", letterSpacing: ".05em", display: "block", marginBottom: 6 }}>{label}</label>
      <input
        type={type}
        value={form[id as keyof typeof form]}
        onChange={e => { setForm(p => ({ ...p, [id]: e.target.value })); setErrors(p => ({ ...p, [id]: "" })); }}
        onKeyDown={e => e.key === "Enter" && handleSubmit()}
        placeholder={placeholder}
        style={{ width: "100%", padding: "12px 16px", background: "rgba(255,255,255,.05)", border: `1px solid ${errors[id] ? "#ff3366" : BORDER}`, borderRadius: 11, color: "#fff", fontSize: 14, outline: "none", transition: "border-color .2s" }}
        onFocus={e => e.target.style.borderColor = ACCENT}
        onBlur={e => e.target.style.borderColor = errors[id] ? "#ff3366" : BORDER}
      />
      {errors[id] && <p style={{ fontSize: 12, color: "#ff3366", marginTop: 5 }}>{errors[id]}</p>}
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: BG, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, position: "relative", overflow: "hidden" }}>
      <ParticleBg density={30} />
      <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 440 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#00d4ff,#6366f1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, boxShadow: "0 0 20px #00d4ff60" }}>⬡</div>
            <span style={{ fontSize: 20, fontWeight: 800 }}>AKASHA<span style={{ color: ACCENT }}>AI</span></span>
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 6 }}>{isLogin ? "Bon retour 👋" : "Créer mon compte"}</h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,.4)" }}>{isLogin ? "Connecte-toi à ta plateforme IA" : "47 outils IA t'attendent"}</p>
        </div>

        <div style={{ background: "rgba(255,255,255,.04)", border: `1px solid ${BORDER}`, borderRadius: 20, padding: "28px 28px" }}>
          {globalError && <div style={{ padding: "10px 14px", background: "rgba(255,51,102,.1)", border: "1px solid rgba(255,51,102,.3)", borderRadius: 10, marginBottom: 16, fontSize: 13, color: "#ff3366" }}>{globalError}</div>}

          {!isLogin && <Field id="name" label="Prénom" placeholder="Marie" />}
          <Field id="email" label="Email" type="email" placeholder="marie@example.fr" />
          <Field id="password" label="Mot de passe" type="password" placeholder="••••••••" />
          {!isLogin && <Field id="confirm" label="Confirmer le mot de passe" type="password" placeholder="••••••••" />}

          <button onClick={handleSubmit} disabled={loading} style={{ width: "100%", padding: "14px", background: loading ? "rgba(0,212,255,.3)" : "linear-gradient(135deg,#00d4ff,#6366f1)", border: "none", borderRadius: 12, color: "#fff", fontSize: 15, fontWeight: 800, cursor: loading ? "not-allowed" : "pointer", boxShadow: loading ? "none" : "0 0 30px #00d4ff40", transition: "all .2s", marginTop: 8 }}>
            {loading ? (
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 1s linear infinite" }} />
                Connexion...
              </span>
            ) : (isLogin ? "Se connecter →" : "Créer mon compte →")}
          </button>

          {/* Google OAuth */}
          <button onClick={handleGoogle} style={{ width: "100%", padding: "12px", background: "rgba(255,255,255,.06)", border: `1px solid ${BORDER}`, borderRadius: 12, color: "rgba(255,255,255,.7)", fontSize: 14, fontWeight: 600, cursor: "pointer", marginTop: 12, transition: "all .2s" }}>
            Continuer avec Google
          </button>

          <div style={{ textAlign: "center", marginTop: 16 }}>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,.4)" }}>{isLogin ? "Pas encore de compte ? " : "Déjà un compte ? "}</span>
            <Link href={isLogin ? "/inscription" : "/connexion"} style={{ fontSize: 13, color: ACCENT, fontWeight: 600, textDecoration: "none" }}>{isLogin ? "S'inscrire" : "Se connecter"}</Link>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 16 }}>
          <Link href="/" style={{ fontSize: 13, color: "rgba(255,255,255,.3)", textDecoration: "none" }}>← Retour à l&apos;accueil</Link>
        </div>
      </div>
    </div>
  );
}
