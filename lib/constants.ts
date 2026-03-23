export const ACCENT = "#00d4ff";
export const BG = "#06060f";
export const CARD = "rgba(255,255,255,0.04)";
export const BORDER = "rgba(255,255,255,0.08)";

export const MODELS = [
  { id: "claude-sonnet-4-20250514", name: "Claude Sonnet 4", provider: "Anthropic", color: "#cc785c", icon: "\u25C8", real: true },
  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI", color: "#10a37f", icon: "\u2726", real: false },
  { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro", provider: "Google", color: "#4285f4", icon: "\u25C9", real: false },
  { id: "grok-3", name: "Grok 3", provider: "xAI", color: "#e5e7eb", icon: "\u2717", real: false },
  { id: "mistral-large", name: "Mistral Large", provider: "Mistral", color: "#ff7000", icon: "\u25B2", real: false },
  { id: "deepseek-r2", name: "DeepSeek R2", provider: "DeepSeek", color: "#818cf8", icon: "\u2B21", real: false },
  { id: "o3", name: "o3 Reasoning", provider: "OpenAI", color: "#34d399", icon: "\u25CE", real: false },
  { id: "llama-4", name: "Llama 4 Scout", provider: "Meta", color: "#3b82f6", icon: "\u2295", real: false },
];

export const TOOLS_DATA = [
  // Image
  { id: "midjourney", name: "Midjourney v7", cat: "Image", color: "#fff", icon: "\u2B25", status: "active" },
  { id: "flux", name: "FLUX Pro", cat: "Image", color: "#f97316", icon: "\u26A1", status: "active" },
  { id: "dalle", name: "DALL\u00B7E 4", cat: "Image", color: "#10a37f", icon: "\u25CC", status: "active" },
  { id: "ideogram", name: "Ideogram 3", cat: "Image", color: "#a855f7", icon: "\u25C6", status: "active" },
  { id: "adobe", name: "Adobe Firefly", cat: "Image", color: "#ff0000", icon: "\uD83D\uDD25", status: "active" },
  { id: "canva", name: "Canva IA", cat: "Image", color: "#00c4cc", icon: "\u25CC", status: "active" },
  // Vid\u00e9o
  { id: "runway", name: "Runway Gen-4", cat: "Vid\u00e9o", color: "#ff0080", icon: "\u25D1", status: "active" },
  { id: "kling", name: "Kling 2.0", cat: "Vid\u00e9o", color: "#fbbf24", icon: "\u25D2", status: "active" },
  { id: "heygen", name: "HeyGen Avatar", cat: "Vid\u00e9o", color: "#00c2ff", icon: "\uD83C\uDFAD", status: "active" },
  { id: "descript", name: "Descript", cat: "Vid\u00e9o", color: "#7c3aed", icon: "\u2702", status: "active" },
  // Audio
  { id: "elevenlabs", name: "ElevenLabs v3", cat: "Audio", color: "#ff6b35", icon: "\u266A", status: "active" },
  { id: "suno", name: "Suno v4", cat: "Audio", color: "#ff4081", icon: "\u266B", status: "active" },
  { id: "udio", name: "Udio 2", cat: "Audio", color: "#00e5ff", icon: "\u266C", status: "active" },
  { id: "stable-audio", name: "Stable Audio 2", cat: "Audio", color: "#8b5cf6", icon: "\u266A", status: "active" },
  { id: "whisper", name: "Whisper Pro", cat: "Audio", color: "#10a37f", icon: "\uD83C\uDFA4", status: "active" },
  // Code
  { id: "cursor", name: "Cursor Agent", cat: "Code", color: "#39ff14", icon: "\u258C", status: "active" },
  { id: "v0", name: "v0.dev", cat: "Code", color: "#e5e7eb", icon: "\u2302", status: "active" },
  { id: "bolt", name: "Bolt.new", cat: "Code", color: "#facc15", icon: "\u2699", status: "active" },
  { id: "copilot", name: "GitHub Copilot X", cat: "Code", color: "#6e40c9", icon: "\u2318", status: "active" },
  { id: "claude-code", name: "Claude Code", cat: "Code", color: "#cc785c", icon: "\u25C8", status: "active" },
  // Automation
  { id: "n8n", name: "n8n Automation", cat: "Automation", color: "#ea4b71", icon: "\u27F3", status: "active" },
  { id: "make", name: "Make Scenarios", cat: "Automation", color: "#6d00cc", icon: "\u25C8", status: "active" },
  { id: "zapier", name: "Zapier IA", cat: "Automation", color: "#ff4a00", icon: "\u26A1", status: "active" },
  { id: "autoagent", name: "AutoAgent", cat: "Automation", color: "#00d4ff", icon: "\uD83E\uDD16", status: "active" },
  // Edge & Cloud
  { id: "banana", name: "Banana GPU", cat: "Cloud", color: "#fef08a", icon: "\u2601", status: "active" },
  { id: "nano", name: "Nano AI Edge", cat: "Cloud", color: "#84cc16", icon: "\u25CE", status: "active" },
  // Recherche & Productivit\u00e9
  { id: "perplexity", name: "Perplexity Sonar", cat: "Recherche", color: "#20b2aa", icon: "\u2297", status: "active" },
  { id: "notion", name: "Notion IA", cat: "Productivit\u00e9", color: "#fff", icon: "\uD83D\uDCDD", status: "active" },
  // LLM
  { id: "claude", name: "Claude Sonnet 4", cat: "LLM", color: "#cc785c", icon: "\u25C8", status: "active" },
  { id: "gpt4o", name: "GPT-4o", cat: "LLM", color: "#10a37f", icon: "\u2726", status: "active" },
  { id: "gemini", name: "Gemini 2.5 Pro", cat: "LLM", color: "#4285f4", icon: "\u25C9", status: "active" },
  { id: "grok", name: "Grok 3", cat: "LLM", color: "#e5e7eb", icon: "\u2717", status: "active" },
  { id: "mistral", name: "Mistral Large", cat: "LLM", color: "#ff7000", icon: "\u25B2", status: "active" },
  { id: "deepseek", name: "DeepSeek R2", cat: "LLM", color: "#818cf8", icon: "\u2B21", status: "active" },
  { id: "o3-reason", name: "o3 Reasoning", cat: "LLM", color: "#34d399", icon: "\u25CE", status: "active" },
  { id: "llama", name: "Llama 4", cat: "LLM", color: "#3b82f6", icon: "\u2295", status: "active" },
  // 3D
  { id: "gen3d", name: "3D Gen IA", cat: "3D", color: "#e040fb", icon: "\u2B21", status: "active" },
  // API
  { id: "supabase-api", name: "Supabase API", cat: "API", color: "#3ecf8e", icon: "\u26A1", status: "active" },
  { id: "vercel-api", name: "Vercel API", cat: "API", color: "#fff", icon: "\u25B2", status: "active" },
];

export const AGENT_TEMPLATES = [
  { id: "content", name: "Agent Contenu", desc: "G\u00e9n\u00e8re, planifie et publie tes posts sur tous les r\u00e9seaux.", icon: "\u270D\uFE0F", color: "#00d4ff", status: "idle" as const },
  { id: "research", name: "Agent Recherche", desc: "Scrute le web et compile des rapports complets automatiquement.", icon: "\uD83D\uDD0D", color: "#ffd700", status: "running" as const },
  { id: "dev", name: "Agent Dev", desc: "Code, teste et d\u00e9ploie des fonctionnalit\u00e9s sans intervention.", icon: "\uD83D\uDCBB", color: "#39ff14", status: "idle" as const },
  { id: "mail", name: "Agent Email", desc: "R\u00e9pond, classe et priorise ta bo\u00eete mail avec contexte IA.", icon: "\uD83D\uDCE7", color: "#ff6b9d", status: "idle" as const },
  { id: "seo", name: "Agent SEO", desc: "Analyse, optimise et publie du contenu optimis\u00e9 pour Google.", icon: "\uD83D\uDCC8", color: "#e040fb", status: "paused" as const },
  { id: "support", name: "Agent Support", desc: "R\u00e9pond aux clients 24h/24 avec ta base de connaissances.", icon: "\uD83C\uDFA7", color: "#ff6b35", status: "idle" as const },
];

export const SIDEBAR_ITEMS = [
  { id: "chat", icon: "\uD83D\uDCAC", label: "Multi-Chat IA" },
  { id: "tools", icon: "\u2699\uFE0F", label: "Outils IA" },
  { id: "agents", icon: "\uD83E\uDD16", label: "Agents" },
  { id: "automation", icon: "\u27F3", label: "Automatisation" },
  { id: "studio", icon: "\uD83C\uDFAC", label: "Studio Cr\u00e9atif" },
  { id: "analytics", icon: "\uD83D\uDCCA", label: "Analytics" },
  { id: "settings", icon: "\u2699", label: "Param\u00e8tres" },
];

export const COMPARISON_DATA = [
  { label: "Outils IA", akasha: "47", mammouth: "~10" },
  { label: "Prix", akasha: "7\u20AC/mois", mammouth: "27\u20AC/mois" },
  { label: "Studio Vid\u00e9o", akasha: true, mammouth: false },
  { label: "IDE Code (Cursor)", akasha: true, mammouth: false },
  { label: "Agents Autonomes", akasha: true, mammouth: false },
  { label: "Automatisation n8n", akasha: true, mammouth: false },
  { label: "Studio Audio", akasha: true, mammouth: false },
  { label: "GPU Cloud", akasha: true, mammouth: false },
  { label: "API universelle", akasha: true, mammouth: false },
  { label: "RGPD France", akasha: true, mammouth: true },
];
