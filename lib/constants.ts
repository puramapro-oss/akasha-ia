export const ACCENT = "#00d4ff";
export const BG = "#06060f";
export const CARD = "rgba(255,255,255,0.04)";
export const BORDER = "rgba(255,255,255,0.08)";

export const MODELS = [
  { id: "claude-sonnet-4-20250514", name: "Claude Sonnet 4", provider: "Anthropic", color: "#cc785c", icon: "◈", real: true, envKey: "ANTHROPIC_API_KEY" },
  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI", color: "#10a37f", icon: "✦", real: true, envKey: "OPENAI_API_KEY" },
  { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro", provider: "Google", color: "#4285f4", icon: "◉", real: true, envKey: "GOOGLE_AI_API_KEY" },
  { id: "grok-3", name: "Grok 3", provider: "xAI", color: "#e5e7eb", icon: "✗", real: true, envKey: "XAI_API_KEY" },
  { id: "mistral-large", name: "Mistral Large", provider: "Mistral", color: "#ff7000", icon: "▲", real: true, envKey: "MISTRAL_API_KEY" },
  { id: "deepseek-r2", name: "DeepSeek R2", provider: "DeepSeek", color: "#818cf8", icon: "⬡", real: true, envKey: "DEEPSEEK_API_KEY" },
  { id: "o3", name: "o3 Reasoning", provider: "OpenAI", color: "#34d399", icon: "◎", real: true, envKey: "OPENAI_API_KEY" },
  { id: "llama-4", name: "Llama 4 Scout", provider: "Meta", color: "#3b82f6", icon: "⊕", real: true, envKey: "OPENROUTER_API_KEY" },
];

// status: "live" = API connectée, "coming" = intégration en cours
export const TOOLS_DATA = [
  // Image
  { id: "midjourney", name: "Midjourney v7", cat: "Image", color: "#fff", icon: "⬥", status: "coming" },
  { id: "flux", name: "FLUX Pro", cat: "Image", color: "#f97316", icon: "⚡", status: "live" },
  { id: "dalle", name: "DALL·E 4", cat: "Image", color: "#10a37f", icon: "◌", status: "live" },
  { id: "ideogram", name: "Ideogram 3", cat: "Image", color: "#a855f7", icon: "◆", status: "coming" },
  { id: "adobe", name: "Adobe Firefly", cat: "Image", color: "#ff0000", icon: "🔥", status: "coming" },
  { id: "canva", name: "Canva IA", cat: "Image", color: "#00c4cc", icon: "◌", status: "coming" },
  // Vidéo
  { id: "runway", name: "Runway Gen-4", cat: "Vidéo", color: "#ff0080", icon: "◑", status: "live" },
  { id: "kling", name: "Kling 2.0", cat: "Vidéo", color: "#fbbf24", icon: "◒", status: "coming" },
  { id: "heygen", name: "HeyGen Avatar", cat: "Vidéo", color: "#00c2ff", icon: "🎭", status: "coming" },
  { id: "descript", name: "Descript", cat: "Vidéo", color: "#7c3aed", icon: "✂", status: "coming" },
  // Audio
  { id: "elevenlabs", name: "ElevenLabs v3", cat: "Audio", color: "#ff6b35", icon: "♪", status: "live" },
  { id: "suno", name: "Suno v4", cat: "Audio", color: "#ff4081", icon: "♫", status: "coming" },
  { id: "udio", name: "Udio 2", cat: "Audio", color: "#00e5ff", icon: "♬", status: "coming" },
  { id: "stable-audio", name: "Stable Audio 2", cat: "Audio", color: "#8b5cf6", icon: "♪", status: "coming" },
  { id: "whisper", name: "Whisper Pro", cat: "Audio", color: "#10a37f", icon: "🎤", status: "coming" },
  // Code
  { id: "cursor", name: "Cursor Agent", cat: "Code", color: "#39ff14", icon: "▌", status: "coming" },
  { id: "v0", name: "v0.dev", cat: "Code", color: "#e5e7eb", icon: "⌂", status: "coming" },
  { id: "bolt", name: "Bolt.new", cat: "Code", color: "#facc15", icon: "⚙", status: "coming" },
  { id: "copilot", name: "GitHub Copilot X", cat: "Code", color: "#6e40c9", icon: "⌘", status: "coming" },
  { id: "claude-code", name: "Claude Code", cat: "Code", color: "#cc785c", icon: "◈", status: "coming" },
  // Automation
  { id: "n8n", name: "n8n Automation", cat: "Automation", color: "#ea4b71", icon: "⟳", status: "coming" },
  { id: "make", name: "Make Scenarios", cat: "Automation", color: "#6d00cc", icon: "◈", status: "coming" },
  { id: "zapier", name: "Zapier IA", cat: "Automation", color: "#ff4a00", icon: "⚡", status: "coming" },
  { id: "autoagent", name: "AutoAgent", cat: "Automation", color: "#00d4ff", icon: "🤖", status: "coming" },
  // Edge & Cloud
  { id: "banana", name: "Banana GPU", cat: "Cloud", color: "#fef08a", icon: "☁", status: "coming" },
  { id: "nano", name: "Nano AI Edge", cat: "Cloud", color: "#84cc16", icon: "◎", status: "coming" },
  // Recherche & Productivité
  { id: "perplexity", name: "Perplexity Sonar", cat: "Recherche", color: "#20b2aa", icon: "⊗", status: "live" },
  { id: "notion", name: "Notion IA", cat: "Productivité", color: "#fff", icon: "📝", status: "coming" },
  // LLM — all connected via /api/chat
  { id: "claude", name: "Claude Sonnet 4", cat: "LLM", color: "#cc785c", icon: "◈", status: "live" },
  { id: "gpt4o", name: "GPT-4o", cat: "LLM", color: "#10a37f", icon: "✦", status: "live" },
  { id: "gemini", name: "Gemini 2.5 Pro", cat: "LLM", color: "#4285f4", icon: "◉", status: "live" },
  { id: "grok", name: "Grok 3", cat: "LLM", color: "#e5e7eb", icon: "✗", status: "live" },
  { id: "mistral", name: "Mistral Large", cat: "LLM", color: "#ff7000", icon: "▲", status: "live" },
  { id: "deepseek", name: "DeepSeek R2", cat: "LLM", color: "#818cf8", icon: "⬡", status: "live" },
  { id: "o3-reason", name: "o3 Reasoning", cat: "LLM", color: "#34d399", icon: "◎", status: "live" },
  { id: "llama", name: "Llama 4", cat: "LLM", color: "#3b82f6", icon: "⊕", status: "live" },
  // 3D
  { id: "gen3d", name: "3D Gen IA", cat: "3D", color: "#e040fb", icon: "⬡", status: "coming" },
  // API
  { id: "supabase-api", name: "Supabase API", cat: "API", color: "#3ecf8e", icon: "⚡", status: "live" },
  { id: "vercel-api", name: "Vercel API", cat: "API", color: "#fff", icon: "▲", status: "live" },
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
  { id: "tools", icon: "⚙", label: "Outils IA" },
  { id: "agents", icon: "🤖", label: "Agents" },
  { id: "automation", icon: "⟳", label: "Automatisation" },
  { id: "studio", icon: "🎬", label: "Studio Créatif" },
  { id: "analytics", icon: "📊", label: "Analytics" },
  { id: "settings", icon: "⚙", label: "Paramètres" },
];

export const COMPARISON_DATA = [
  { label: "Outils IA", akasha: "47", mammouth: "~10" },
  { label: "Prix", akasha: "7€/mois", mammouth: "27€/mois" },
  { label: "Studio Vidéo", akasha: true, mammouth: false },
  { label: "IDE Code (Cursor)", akasha: true, mammouth: false },
  { label: "Agents Autonomes", akasha: true, mammouth: false },
  { label: "Automatisation n8n", akasha: true, mammouth: false },
  { label: "Studio Audio", akasha: true, mammouth: false },
  { label: "GPU Cloud", akasha: true, mammouth: false },
  { label: "API universelle", akasha: true, mammouth: false },
  { label: "RGPD France", akasha: true, mammouth: true },
];
