import { getSupabaseAdmin, getSupabaseServer } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const supabaseAuth = await getSupabaseServer();
    const { data: { user } } = await supabaseAuth.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: "Non autoris\u00e9" }), { status: 401 });
    }

    const { plan } = await req.json();
    if (!plan) {
      return new Response(JSON.stringify({ error: "Plan requis" }), { status: 400 });
    }

    // Map plan key (e.g. "AUTOMATE_pro") to env var name
    const envKey = `STRIPE_PRICE_${plan.toUpperCase().replace("_", "_")}_ID`;
    const priceId = process.env[envKey];
    if (!priceId || priceId.startsWith("price_YOUR")) {
      return new Response(JSON.stringify({ error: "Plan non configur\u00e9 dans Stripe" }), { status: 400 });
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
      metadata: { plan, user_id: user.id },
    });

    return Response.json({ url: session.url });
  } catch {
    return new Response(JSON.stringify({ error: "Erreur checkout" }), { status: 500 });
  }
}
