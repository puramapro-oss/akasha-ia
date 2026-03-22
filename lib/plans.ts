export type PlanName = "SPARK" | "NOVA" | "APEX";

export interface PlanConfig {
  label: PlanName;
  price: number;
  daily: number;
  monthly: number;
  maxTokens: number;
  color: string;
}

export const PLANS_CONFIG: Record<PlanName, PlanConfig> = {
  SPARK: { label: "SPARK", price: 7, daily: 5, monthly: 150, maxTokens: 500, color: "#00d4ff" },
  NOVA: { label: "NOVA", price: 17, daily: 20, monthly: 600, maxTokens: 1000, color: "#ffd700" },
  APEX: { label: "APEX", price: 37, daily: 999, monthly: 99999, maxTokens: 2000, color: "#39ff14" },
};
