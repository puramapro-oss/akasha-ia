"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { ACCENT, BG, BORDER, CARD, MODELS } from "@/lib/constants";
import { getPlanConfig } from "@/lib/plans";
import UpgradeModal from "./UpgradeModal";

interface ChatSectionProps {
  userName: string;
  userPlan: string;
}

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  model?: string;
}

export default function ChatSection({ userName, userPlan }: ChatSectionProps) {
  const [msgs, setMsgs] = useState<Message[]>([
    { id: 1, role: "assistant", content: `Bonjour ${userName || ""} 👋 Je suis **AKASHA AI**, ton assistant IA ultime. Je peux t'aider avec du code, de la rédaction, de l'analyse, des idées créatives et bien plus. Que veux-tu créer aujourd'hui ?`, model: "claude-sonnet-4-20250514" }
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [streamText, setStreamText] = useState("");
  const [selectedModel, setSelectedModel] = useState(MODELS[0]);
  const [showModels, setShowModels] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [quotaInfo, setQuotaInfo] = useState({ daily: 0, pct: 0, limit: 5, blocked: false, remaining: 5 });
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const planCfg = getPlanConfig(userPlan);
  const dailyLimit = planCfg?.tier.daily || 5;

  const refreshQuota = useCallback(() => {
    fetch("/api/usage")
      .then(r => r.json())
      .then(d => setQuotaInfo({ daily: d.daily || 0, pct: d.pct || 0, limit: d.limits?.daily || dailyLimit, blocked: d.blocked || false, remaining: d.remaining ?? dailyLimit }))
      .catch(() => {});
  }, [dailyLimit]);

  useEffect(() => { refreshQuota(); }, [refreshQuota]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, streamText]);

  const send = async () => {
    const txt = input.trim();
    if (!txt || streaming) return;

    const userMsg: Message = { id: Date.now(), role: "user", content: txt };
    const history = [...msgs, userMsg].filter(m => m.role !== "assistant" || m.id !== 0);
    setMsgs(p => [...p, userMsg]);
    setInput("");
    setStreaming(true);
    setStreamText("");

    if (selectedModel.real) {
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history.map(m => ({ role: m.role, content: m.content })) }),
        });

        if (res.status === 429) {
          setShowUpgrade(true);
          setStreaming(false);
          refreshQuota();
          return;
        }

        if (!res.ok) {
          const err = await res.json();
          setMsgs(p => [...p, { id: Date.now(), role: "assistant", content: `Erreur : ${err.error || "Erreur inconnue"}`, model: selectedModel.id }]);
          setStreaming(false);
          return;
        }

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";

        while (reader) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          const lines = chunk.split("\n").filter(Boolean);
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") break;
              try {
                const parsed = JSON.parse(data);
                if (parsed.text) { accumulated += parsed.text; setStreamText(accumulated); }
                if (parsed.error) { accumulated += `\n\nErreur: ${parsed.error}`; setStreamText(accumulated); }
              } catch {}
            }
          }
        }

        setMsgs(p => [...p, { id: Date.now(), role: "assistant", content: accumulated, model: selectedModel.id }]);
        setStreamText("");
        setStreaming(false);
        refreshQuota();
      } catch {
        setMsgs(p => [...p, { id: Date.now(), role: "assistant", content: "Erreur de connexion à l'API.", model: selectedModel.id }]);
        setStreaming(false);
      }
    } else {
      const replies = [
        `Excellente question ! Voici mon analyse approfondie sur **"${txt.slice(0, 40)}..."**\n\nCe sujet est fascinant. En tant que ${selectedModel.name}, je suis optimisé pour ce type de requête.\n\nCommençons par les points essentiels...`,
        `Super demande ! Je traite ça avec toute la puissance de **${selectedModel.name}**.\n\nVoici ce que je recommande : une approche en 3 étapes claires, chacune avec des métriques de succès mesurables.`,
      ];
      const reply = replies[Math.floor(Math.random() * replies.length)];
      let i = 0;
      let acc = "";
      const words = reply.split(" ");
      const id2 = setInterval(() => {
        if (i < words.length) { acc += words[i] + " "; setStreamText(acc); i++; }
        else { clearInterval(id2); setMsgs(p => [...p, { id: Date.now(), role: "assistant", content: reply, model: selectedModel.id }]); setStreaming(false); setStreamText(""); }
      }, 25);
    }
  };

  const renderContent = (text: string) => {
    return text.split(/(\*\*.*?\*\*)/g).map((part, i) =>
      part.startsWith("**") && part.endsWith("**")
        ? <strong key={i} style={{ color: "#fff", fontWeight: 700 }}>{part.slice(2, -2)}</strong>
        : <span key={i}>{part}</span>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: BG }}>
      {showUpgrade && <UpgradeModal userPlan={userPlan} used={quotaInfo.daily} onClose={() => setShowUpgrade(false)} />}

      {/* Model selector + quota bar */}
      <div style={{ padding: "10px 20px", borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,.02)", flexShrink: 0, flexWrap: "wrap" }}>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,.4)" }}>Modèle :</span>
        <div style={{ position: "relative" }}>
          <button onClick={() => setShowModels(v => !v)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 14px", background: CARD, border: `1px solid ${selectedModel.color}50`, borderRadius: 10, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            <span style={{ color: selectedModel.color, fontSize: 12 }}>{selectedModel.icon}</span>
            {selectedModel.name}
            <span style={{ fontSize: 10, color: "rgba(255,255,255,.4)", transform: showModels ? "rotate(180deg)" : "none", transition: "transform .2s", display: "inline-block" }}>{"▼"}</span>
          </button>
          {showModels && (
            <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, background: "rgba(6,6,15,.97)", border: `1px solid ${BORDER}`, borderRadius: 12, padding: 6, minWidth: 220, zIndex: 100, boxShadow: "0 16px 40px rgba(0,0,0,.6)" }}>
              {MODELS.map(m => (
                <div key={m.id} onClick={() => { setSelectedModel(m); setShowModels(false); }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, cursor: "pointer", transition: "background .15s", background: selectedModel.id === m.id ? `${m.color}15` : "transparent" }} onMouseEnter={e => (e.currentTarget.style.background = `${m.color}10`)} onMouseLeave={e => (e.currentTarget.style.background = selectedModel.id === m.id ? `${m.color}15` : "transparent")}>
                  <span style={{ color: m.color, fontSize: 13 }}>{m.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{m.name}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,.35)" }}>{m.provider}{m.real ? " · Connecté" : " · Simulé"}</div>
                  </div>
                  {m.real && <span style={{ marginLeft: "auto", fontSize: 9, background: "#39ff1420", color: "#39ff14", border: "1px solid #39ff1440", borderRadius: 6, padding: "2px 7px", fontWeight: 700 }}>LIVE</span>}
                </div>
              ))}
            </div>
          )}
        </div>
        {selectedModel.real && <span style={{ fontSize: 11, color: "#39ff14", background: "#39ff1415", border: "1px solid #39ff1440", borderRadius: 8, padding: "3px 10px", fontWeight: 700 }}>{"✓"} API Réelle Active</span>}

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,.35)" }}>Quota</span>
          <div style={{ width: 70, height: 4, background: "rgba(255,255,255,.08)", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${quotaInfo.pct}%`, background: quotaInfo.pct >= 80 ? "linear-gradient(90deg,#ffd700,#ff3366)" : `linear-gradient(90deg,${ACCENT},#7c3aed)`, borderRadius: 4, transition: "width .4s ease" }} />
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, color: quotaInfo.pct >= 80 ? "#ffd700" : ACCENT }}>
            {quotaInfo.daily}/{dailyLimit === 999 ? "∞" : dailyLimit}
          </span>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: 16 }}>
        {msgs.map(m => (
          <div key={m.id} style={{ display: "flex", gap: 12, alignItems: "flex-start", flexDirection: m.role === "user" ? "row-reverse" : "row" }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, background: m.role === "user" ? `linear-gradient(135deg,${ACCENT},#7c3aed)` : "rgba(204,120,92,.2)", border: m.role === "assistant" ? "1px solid #cc785c50" : "none", fontWeight: 800, color: m.role === "user" ? "#fff" : "#cc785c" }}>
              {m.role === "user" ? (userName?.[0]?.toUpperCase() || "U") : "◈"}
            </div>
            <div style={{ maxWidth: "75%", padding: "12px 16px", borderRadius: m.role === "user" ? "16px 4px 16px 16px" : "4px 16px 16px 16px", background: m.role === "user" ? `linear-gradient(135deg,rgba(0,212,255,.15),rgba(124,58,237,.15))` : CARD, border: `1px solid ${m.role === "user" ? "rgba(0,212,255,.2)" : BORDER}`, fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,.85)", whiteSpace: "pre-wrap" }}>
              {renderContent(m.content)}
              {m.model && m.role === "assistant" && <div style={{ fontSize: 10, color: "rgba(255,255,255,.25)", marginTop: 8, borderTop: "1px solid rgba(255,255,255,.05)", paddingTop: 6 }}>{MODELS.find(x => x.id === m.model)?.name || m.model}</div>}
            </div>
          </div>
        ))}
        {streaming && streamText && (
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, background: "rgba(204,120,92,.2)", border: "1px solid #cc785c50", color: "#cc785c", fontWeight: 800 }}>{"◈"}</div>
            <div style={{ maxWidth: "75%", padding: "12px 16px", borderRadius: "4px 16px 16px 16px", background: CARD, border: `1px solid ${BORDER}`, fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,.85)", whiteSpace: "pre-wrap" }}>
              {renderContent(streamText)}<span style={{ animation: "pulse 1s infinite", color: ACCENT, marginLeft: 2 }}>{"▌"}</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: "16px 20px", borderTop: `1px solid ${BORDER}`, background: "rgba(255,255,255,.02)", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-end", background: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: "10px 14px" }}>
          <textarea ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} placeholder="cris ton message... (Entrée pour envoyer)" rows={1} style={{ flex: 1, background: "transparent", border: "none", color: "#fff", fontSize: 14, resize: "none", outline: "none", lineHeight: 1.6, maxHeight: 120, overflowY: "auto", fontFamily: "inherit" }} />
          <button onClick={send} disabled={!input.trim() || streaming} style={{ width: 36, height: 36, borderRadius: 10, background: input.trim() && !streaming ? `linear-gradient(135deg,${ACCENT},#7c3aed)` : "rgba(255,255,255,.08)", border: "none", cursor: input.trim() && !streaming ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0, transition: "all .2s", boxShadow: input.trim() && !streaming ? "0 0 16px #00d4ff40" : "none", color: "#fff" }}>
            {streaming ? <span style={{ width: 14, height: 14, border: "2px solid rgba(255,255,255,.2)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 1s linear infinite" }} /> : "↑"}
          </button>
        </div>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,.2)", textAlign: "center", marginTop: 8 }}>AKASHA AI peut faire des erreurs. Vérifie les informations importantes.</p>
      </div>
    </div>
  );
}
