import { getSupabaseAdmin, getSupabaseServer } from "@/lib/supabase/server";
import { getPlanConfig } from "@/lib/plans";

export async function GET() {
  try {
    const supabaseAuth = await getSupabaseServer();
    const { data: { user } } = await supabaseAuth.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: "Non autoris\u00e9" }), { status: 401 });
    }

    const supabase = getSupabaseAdmin();
    const { data: userData } = await supabase.from("users").select("plan").eq("id", user.id).single();
    const planKey = userData?.plan || "AUTOMATE_essentiel";
    const planCfg = getPlanConfig(planKey);
    const dailyLimit = planCfg?.tier.daily || 5;
    const monthlyLimit = planCfg?.tier.monthly || 100;
    const maxTokens = planCfg?.tier.maxTokens || 500;

    const today = new Date().toISOString().slice(0, 10);
    const { data: usage } = await supabase.from("usage").select("request_count, tokens_used").eq("user_id", user.id).eq("date", today).single();
    const daily = usage?.request_count || 0;
    const tokens = usage?.tokens_used || 0;

    const monthStart = today.slice(0, 7) + "-01";
    const { data: monthlyUsage } = await supabase.from("usage").select("request_count").eq("user_id", user.id).gte("date", monthStart);
    const monthly = (monthlyUsage || []).reduce((sum: number, row: { request_count: number }) => sum + row.request_count, 0);

    const remaining = Math.max(dailyLimit - daily, 0);
    const pct = dailyLimit === 999 ? 0 : Math.min((daily / dailyLimit) * 100, 100);

    return Response.json({
      daily, monthly, tokens, remaining, pct,
      blocked: remaining <= 0,
      plan: planKey,
      limits: { daily: dailyLimit, monthly: monthlyLimit, maxTokens },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Erreur serveur" }), { status: 500 });
  }
}
