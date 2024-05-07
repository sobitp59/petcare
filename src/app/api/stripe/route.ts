import prisma from "@/lib/db";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  //  webhook verification
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.log("Webhook verification failed ", error);
    return Response.json(null, { status: 400 });
  }

  const checkoutSession = event.data.object as Stripe.Checkout.Session;
  console.log("EMAIL WH", checkoutSession.customer_email);

  //  order
  try {
    switch (event.type) {
      case "checkout.session.completed":
        await prisma.user.update({
          where: {
            email: checkoutSession.customer_email!,
          },
          data: {
            hasLifetimeAccess: true,
          },
        });
        break;
      default:
        //  Unexpected event type
        console.log(event.type, `🤷‍♀️ Unhandled event type`);
        break;
    }
  } catch (error) {
    console.log("ERROR POST ", error);
  }

  return Response.json(null, { status: 200 });
}
