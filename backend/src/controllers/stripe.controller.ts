import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST as string);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_TEST as string;

let prisma = new PrismaClient();

export const webhook = async (req: Request, res: Response) => {
  console.log("Webhook received");
  const sig = req.headers["stripe-signature"] as string | undefined;

  if (!sig) {
    throw new Error("Stripe signature not provided");
  }

  let data;
  let event: Stripe.Event;
  let eventType: Stripe.Event.Type;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (error) {
    console.log(`Webhook Error: ${error}`);
    throw new Error(`Webhook Error: ${error}`);
  }

  data = event.data;
  eventType = event.type;

  // Handle the event
  switch (eventType) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log("PaymentIntent was successful!");
      break;
    case "payment_method.attached":
      const paymentMethod = event.data.object as Stripe.PaymentMethod;
      console.log("PaymentMethod was attached to a Customer!");
      break;
    case "checkout.session.completed":
      // Payment is successful and the subscription is created.
      const session = event.data.object as Stripe.Checkout.Session;
      // Récupérer l'email du client depuis la session
      const customerEmail = session.customer_details?.email;

      if (customerEmail) {
        // Rechercher un utilisateur avec cet email
        let user = await prisma.user.findUnique({
          where: { email: customerEmail },
        });

        // Si l'utilisateur n'existe pas, en créer un nouveau
        if (!user) {
          console.log(`New user created with email: ${customerEmail}`);
        } else {
          // Si l'utilisateur existe, mettez à jour son accès

          console.log(
            `Access granted to existing user with email: ${customerEmail}`,
          );
        }
      } else {
        console.error("No customer email found in session");
      }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};
