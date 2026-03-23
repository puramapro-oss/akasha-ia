export type PlanCategory = "AUTOMATE" | "CREATE" | "BUILD" | "COMPLET";
export type PlanTier = "essentiel" | "pro" | "max";
export type PlanKey = `${PlanCategory}_${PlanTier}`;

export interface PlanTierConfig {
  tier: PlanTier;
  price: number;
  daily: number;
  monthly: number;
  maxTokens: number;
  popular?: boolean;
  features: string[];
}

export interface PlanCategoryConfig {
  name: PlanCategory;
  label: string;
  icon: string;
  color: string;
  tools: string[];
  tiers: Record<PlanTier, PlanTierConfig>;
}

export const PLANS: Record<PlanCategory, PlanCategoryConfig> = {
  AUTOMATE: {
    name: "AUTOMATE",
    label: "Automate",
    icon: "\u26A1",
    color: "#00d4ff",
    tools: [
      "n8n", "Make", "Zapier", "AutoAgent", "Perplexity Sonar",
      "Notion IA", "Grok 3", "Llama 4", "Whisper Pro", "DeepSeek R2",
      "Mistral Large", "Nano AI Edge", "Banana GPU",
    ],
    tiers: {
      essentiel: {
        tier: "essentiel",
        price: 7,
        daily: 5,
        monthly: 100,
        maxTokens: 500,
        features: [
          "500 t\u00e2ches n8n/mois",
          "3 agents",
          "10 workflows",
          "100 req IA/mois",
        ],
      },
      pro: {
        tier: "pro",
        price: 11,
        daily: 20,
        monthly: 500,
        maxTokens: 1000,
        popular: true,
        features: [
          "2000 t\u00e2ches n8n/mois",
          "10 agents",
          "Workflows illimit\u00e9s",
          "500 req IA/mois",
        ],
      },
      max: {
        tier: "max",
        price: 16,
        daily: 999,
        monthly: 99999,
        maxTokens: 2000,
        features: ["Tout illimit\u00e9"],
      },
    },
  },
  CREATE: {
    name: "CREATE",
    label: "Create",
    icon: "\uD83C\uDFAC",
    color: "#ff6b9d",
    tools: [
      "ElevenLabs v3", "Suno v4", "Udio 2", "Stable Audio 2",
      "Runway Gen-4", "FLUX Pro", "Midjourney v7", "DALL\u00B7E 4", "Ideogram 3",
      "Adobe Firefly", "Canva IA", "HeyGen Avatar", "Kling 2.0",
      "Descript", "3D Gen IA", "Gemini 2.5 Pro", "Banana GPU",
    ],
    tiers: {
      essentiel: {
        tier: "essentiel",
        price: 7,
        daily: 5,
        monthly: 100,
        maxTokens: 500,
        features: [
          "100 images/mois",
          "20 vid\u00e9os/mois",
          "30 min voix/mois",
          "50 cr\u00e9as audio/mois",
        ],
      },
      pro: {
        tier: "pro",
        price: 11,
        daily: 20,
        monthly: 500,
        maxTokens: 1000,
        popular: true,
        features: [
          "500 images/mois",
          "100 vid\u00e9os/mois",
          "3h voix/mois",
          "200 cr\u00e9as audio/mois",
        ],
      },
      max: {
        tier: "max",
        price: 16,
        daily: 999,
        monthly: 99999,
        maxTokens: 2000,
        features: ["Tout illimit\u00e9"],
      },
    },
  },
  BUILD: {
    name: "BUILD",
    label: "Build",
    icon: "\uD83D\uDCBB",
    color: "#39ff14",
    tools: [
      "Claude Sonnet 4", "GPT-4o", "o3 Reasoning", "Claude Code",
      "Bolt.new", "Cursor Agent", "v0.dev", "GitHub Copilot X",
      "Supabase API", "Vercel API", "Make", "Perplexity Sonar",
    ],
    tiers: {
      essentiel: {
        tier: "essentiel",
        price: 7,
        daily: 5,
        monthly: 100,
        maxTokens: 500,
        features: [
          "100 req IA/mois",
          "10 d\u00e9ploiements Vercel",
          "1 projet Supabase",
          "Claude + GPT",
        ],
      },
      pro: {
        tier: "pro",
        price: 11,
        daily: 20,
        monthly: 500,
        maxTokens: 1000,
        popular: true,
        features: [
          "500 req IA/mois",
          "50 d\u00e9ploiements",
          "5 projets Supabase",
          "Tous les mod\u00e8les",
        ],
      },
      max: {
        tier: "max",
        price: 16,
        daily: 999,
        monthly: 99999,
        maxTokens: 2000,
        features: ["Tout illimit\u00e9"],
      },
    },
  },
  COMPLET: {
    name: "COMPLET",
    label: "Complet",
    icon: "\uD83C\uDF0C",
    color: "#ffd700",
    tools: ["Les 47 outils AKASHA AI"],
    tiers: {
      essentiel: {
        tier: "essentiel",
        price: 22,
        daily: 10,
        monthly: 300,
        maxTokens: 1000,
        features: [
          "300 req LLM",
          "200 images",
          "50 vid\u00e9os",
          "5 agents",
        ],
      },
      pro: {
        tier: "pro",
        price: 33,
        daily: 35,
        monthly: 1000,
        maxTokens: 2000,
        popular: true,
        features: [
          "1000 req LLM",
          "500 images",
          "200 vid\u00e9os",
          "20 agents",
        ],
      },
      max: {
        tier: "max",
        price: 44,
        daily: 999,
        monthly: 99999,
        maxTokens: 4000,
        features: ["Tout illimit\u00e9 sur les 47 outils"],
      },
    },
  },
};

// Helper to get plan config from a key like "AUTOMATE_pro"
export function getPlanConfig(key: string): { category: PlanCategoryConfig; tier: PlanTierConfig } | null {
  const [cat, t] = key.split("_") as [PlanCategory, PlanTier];
  const category = PLANS[cat];
  if (!category) return null;
  const tier = category.tiers[t];
  if (!tier) return null;
  return { category, tier };
}

// Default plan for new users
export const DEFAULT_PLAN = "AUTOMATE_essentiel";
