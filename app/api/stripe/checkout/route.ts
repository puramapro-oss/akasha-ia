import { getSupabaseAdmin, getSupabaseServer } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe";

const PRICE_MAP: Record<string, string | undefined> = {
  SPARK: process.env.STRIPE_PRICE_SPARK_ID,
  NOVA: process.env.STRIPE_PRICE_NOVA_ID,
  APEX: process.env.STRIPE_PRICE_APEX_ID,
};

export async function POST(req: Request) {
  try {
    const supabaseAuth = await getSupabaseServer();
    const { data: { user } } = await supabaseAuth.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: "Non autorisé" }), { status: 401 });
    }

    const { plan } = await req.json();
    const priceId = PRICE_MAP[plan?.toUpperCase()];
    if (!priceId) {
      return new Response(JSON.stringify({ error: "Plan invalide" }), { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { data: userData } = await supabase.from("users").select("stripe_customer_id, email").eq("id", user.id).single();

    const stripe = getStripe();
    let customerId = userData?.stripe_customer_id;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: userData?.email || user.email!,
        metadata: { supabase_user_id: user.id },
      });
      customerId = customer.id;
      await supabase.from("users").update({ stripe_customer_id: customerId }).eq("id", user.id);
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?canceled=true`,
      metadata: { plan: plan.toUpperCase(), user_id: user.id },
    });

    return Response.json({ url: session.url });
  } catch {
    return new Response(JSON.stringify({ error: "Erreur checkout" }), { status: 500 });
  }
}
