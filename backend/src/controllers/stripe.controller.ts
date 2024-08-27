import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST as string);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_TEST as string;

let prisma = new PrismaClient();

// Create a checkout session
export const createCheckoutSession = async (req: Request, res: Response) => {
  const { userId } = req.body;

  if (!userId) {
    throw new Error("User ID not provided");
  }

  // Get the user's email
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: user.email,
    line_items: [
      {
        price: "price_1PbhjjLgRo1w7m00AcJ5MOfI",
        quantity: 1,
      },
    ],
    metadata: {
      userId: user.id,
    },
    success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/cancel`,
  });

  res.json({ id: session.id, url: session.url });
};

// Webhook handler
export const webhook = async (req: Request, res: Response) => {
  console.log("Webhook received");
  const sig = req.headers["stripe-signature"] as string | undefined;

  if (!sig) {
    throw new Error("Stripe signature not provided");
  }

  let event: Stripe.Event;
  let eventType: Stripe.Event.Type;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (error) {
    console.log(`Webhook Error: ${error}`);
    throw new Error(`Webhook Error: ${error}`);
  }

  eventType = event.type;

  const session = event.data.object as Stripe.Checkout.Session;

  // Handle the event
  switch (eventType) {
    // Event when the subscription is started
    case "checkout.session.completed":
      console.log("Checkout session completed");
      const subscription = stripe.subscriptions.retrieve(
        session.subscription as string,
      );
      console.log("Subscription : ", subscription);
      break;
    // Event when the payment is successful (every subscription interval)
    case "invoice.paid":
      console.log("Invoice paid");
      break;
    // Event when the payment failed due to card issues (every subscription interval)
    case "invoice.payment_failed":
      console.log("Invoice payment failed");
      break;
    // Event when the subscription is updated
    case "customer.subscription.updated":
      console.log("Customer subscription updated");
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};
