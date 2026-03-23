import { redirect } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import DashboardShell from "./DashboardShell";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await getSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/connexion");

  const admin = getSupabaseAdmin();
  const { data: userData } = await admin
    .from("users")
    .select("name, plan, email")
    .eq("id", user.id)
    .single();

  const userName = userData?.name || user.user_metadata?.name || user.email?.split("@")[0] || "Utilisateur";
  const userPlan = userData?.plan || "AUTOMATE_essentiel";
  const userEmail = userData?.email || user.email || "";

  return (
    <DashboardShell userName={userName} userPlan={userPlan} userEmail={userEmail}>
      {children}
    </DashboardShell>
  );
}
