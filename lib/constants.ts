export const ACCENT = "#00d4ff";
export const BG = "#06060f";
export const CARD = "rgba(255,255,255,0.04)";
export const BORDER = "rgba(255,255,255,0.08)";

export const MODELS = [
  { id: "claude-sonnet-4-20250514", name: "Claude Sonnet 4", provider: "Anthropic", color: "#cc785c", icon: "◈", real: true },
  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI", color: "#10a37f", icon: "✦", real: false },
  { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro", provider: "Google", color: "#4285f4", icon: "◉", real: false },
  { id: "grok-3", name: "Grok 3", provider: "xAI", color: "#e5e7eb", icon: "✗", real: false },
  { id: "mistral-large", name: "Mistral Large", provider: "Mistral", color: "#ff7000", icon: "▲", real: false },
  { id: "deepseek-r2", name: "DeepSeek R2", provider: "DeepSeek", color: "#818cf8", icon: "⬡", real: false },
  { id: "o3", name: "o3 Reasoning", provider: "OpenAI", color: "#34d399", icon: "◎", real: false },
  { id: "llama-4", name: "Llama 4 Scout", provider: "Meta", color: "#3b82f6", icon: "⊕", real: false },
];

export const TOOLS_DATA = [
  { id: "midjourney", name: "Midjourney v7", cat: "Image", color: "#fff", icon: "⬥", status: "active" },
  { id: "flux", name: "FLUX Pro", cat: "Image", color: "#f97316", icon: "⚡", status: "active" },
  { id: "dalle", name: "DALL·E 4", cat: "Image", color: "#10a37f", icon: "◌", status: "active" },
  { id: "sora", name: "Sora 2", cat: "Vidéo", color: "#10a37f", icon: "▶", status: "active" },
  { id: "runway", name: "Runway Gen-4", cat: "Vidéo", color: "#ff0080", icon: "◑", status: "active" },
  { id: "capcut", name: "CapCut IA", cat: "Vidéo", color: "#00d4ff", icon: "✂", status: "active" },
  { id: "kling", name: "Kling 2.0", cat: "Vidéo", color: "#fbbf24", icon: "◒", status: "active" },
  { id: "cursor", name: "Cursor Agent", cat: "Code", color: "#39ff14", icon: "▌", status: "active" },
  { id: "v0", name: "v0.dev", cat: "Code", color: "#e5e7eb", icon: "⌂", status: "active" },
  { id: "bolt", name: "Bolt.new", cat: "Code", color: "#facc15", icon: "⚙", status: "active" },
  { id: "elevenlabs", name: "ElevenLabs v3", cat: "Audio", color: "#ff6b35", icon: "♪", status: "active" },
  { id: "suno", name: "Suno v4", cat: "Audio", color: "#ff4081", icon: "♫", status: "active" },
  { id: "udio", name: "Udio 2", cat: "Audio", color: "#00e5ff", icon: "♬", status: "active" },
  { id: "n8n", name: "n8n Automation", cat: "Automation", color: "#ea4b71", icon: "⟳", status: "active" },
  { id: "make", name: "Make Scenarios", cat: "Automation", color: "#6d00cc", icon: "◈", status: "active" },
  { id: "zapier", name: "Zapier IA", cat: "Automation", color: "#ff4a00", icon: "⚡", status: "active" },
  { id: "heygen", name: "HeyGen Avatar", cat: "Vidéo", color: "#00c2ff", icon: "🎭", status: "active" },
  { id: "adobe", name: "Adobe Firefly", cat: "Image", color: "#ff0000", icon: "🔥", status: "active" },
  { id: "canva", name: "Canva IA", cat: "Image", color: "#00c4cc", icon: "◌", status: "active" },
  { id: "gen3d", name: "3D Gen IA", cat: "3D", color: "#e040fb", icon: "⬡", status: "active" },
  { id: "meshy", name: "Meshy 3D", cat: "3D", color: "#a78bfa", icon: "⬡", status: "active" },
  { id: "banana", name: "Banana GPU", cat: "Edge", color: "#fef08a", icon: "☁", status: "active" },
  { id: "nano", name: "Nano AI Edge", cat: "Edge", color: "#84cc16", icon: "◎", status: "active" },
  { id: "perplexity", name: "Perplexity Sonar", cat: "Recherche", color: "#20b2aa", icon: "⊗", status: "active" },
  { id: "notion", name: "Notion IA", cat: "Productivité", color: "#fff", icon: "📝", status: "active" },
];

export const AGENT_TEMPLATES = [
  { id: "content", name: "Agent Contenu", desc: "Génère, planifie et publie tes posts sur tous les réseaux.", icon: "✍️", color: "#00d4ff", status: "idle" as const },
  { id: "research", name: "Agent Recherche", desc: "Scrute le web et compile des rapports complets automatiquement.", icon: "🔍", color: "#ffd700", status: "running" as const },
  { id: "dev", name: "Agent Dev", desc: "Code, teste et déploie des fonctionnalités sans intervention.", icon: "💻", color: "#39ff14", status: "idle" as const },
  { id: "mail", name: "Agent Email", desc: "Répond, classe et priorise ta boîte mail avec contexte IA.", icon: "📧", color: "#ff6b9d", status: "idle" as const },
  { id: "seo", name: "Agent SEO", desc: "Analyse, optimise et publie du contenu optimisé pour Google.", icon: "📈", color: "#e040fb", status: "paused" as const },
  { id: "support", name: "Agent Support", desc: "Répond aux clients 24h/24 avec ta base de connaissances.", icon: "🎧", color: "#ff6b35", status: "idle" as const },
];

export const SIDEBAR_ITEMS = [
  { id: "chat", icon: "💬", label: "Multi-Chat IA" },
  { id: "tools", icon: "⚙️", label: "Outils IA" },
  { id: "agents", icon: "🤖", label: "Agents" },
  { id: "automation", icon: "⟳", label: "Automatisation" },
  { id: "studio", icon: "🎬", label: "Studio Créatif" },
  { id: "analytics", icon: "📊", label: "Analytics" },
  { id: "settings", icon: "⚙", label: "Paramètres" },
];
