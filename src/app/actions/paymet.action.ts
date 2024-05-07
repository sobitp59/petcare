"use server";

import { checkAuth } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function stripeCheckout() {
  const session = await checkAuth();

  const checkoutSession = await stripe.checkout.sessions.create({
    customer_email: session.user.email!,
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID!,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.CANONICAL_URL}/payment?success=true`,
    cancel_url: `${process.env.CANONICAL_URL}/payment?cancelled=true`,
  });

  console.log("CHECKOUT SESSION ", checkoutSession);

  redirect(checkoutSession.url!);
}
