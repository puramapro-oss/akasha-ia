import { NextRequest } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import type Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  if (!sig) return new Response("Missing signature", { status: 400 });

  const stripe = getStripe();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return new Response(`Webhook error: ${(err as Error).message}`, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const plan = session.metadata?.plan || "SPARK";
      const userId = session.metadata?.user_id;
      if (userId) {
        await supabase.from("users").update({ plan, stripe_customer_id: session.customer as string, stripe_subscription_id: session.subscription as string, updated_at: new Date().toISOString() }).eq("id", userId);
      }
      break;
    }
    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;
      const { data: user } = await supabase.from("users").select("id").eq("stripe_customer_id", customerId).single();
      if (user) {
        await supabase.from("users").update({ stripe_subscription_id: subscription.id, updated_at: new Date().toISOString() }).eq("id", user.id);
      }
      break;
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;
      const { data: user } = await supabase.from("users").select("id").eq("stripe_customer_id", customerId).single();
      if (user) {
        await supabase.from("users").update({ plan: "SPARK", stripe_subscription_id: null, updated_at: new Date().toISOString() }).eq("id", user.id);
      }
      break;
    }
  }

  return new Response("OK", { status: 200 });
}
