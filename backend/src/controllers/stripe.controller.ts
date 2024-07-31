import { Request, Response } from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST as string);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_TEST as string;

export const webhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"] as string | undefined;

  if (!sig) {
    throw new Error("Stripe signature not provided");
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (error) {
    throw new Error(`Webhook Error: ${error}`);
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log("PaymentIntent was successful!");
      break;
    case "payment_method.attached":
      const paymentMethod = event.data.object as Stripe.PaymentMethod;
      console.log("PaymentMethod was attached to a Customer!");
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};
