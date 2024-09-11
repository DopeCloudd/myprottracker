import { Plan, PrismaClient } from "@prisma/client";
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
  // Get the event type
  eventType = event.type;
  // Get the data
  const data = event.data.object as Stripe.Checkout.Session;

  // Handle the event
  try {
    switch (eventType) {
      // Event when the subscription is started
      case "checkout.session.completed":
        console.log("Checkout session completed");
        // Get the subscription details
        const session = await stripe.checkout.sessions.retrieve(data.id, {
          expand: ["subscription", "line_items"],
        });
        // Get the customer details
        const customerId = session.customer as string;
        const customerDettails = session.customer_details;
        // If the customer has an email, update the user's stripeCustomerId
        if (customerDettails?.email) {
          // Find the user in the database
          const user = await prisma.user.findUnique({
            where: { email: customerDettails.email },
          });
          // If the user is not found, throw an error
          if (!user) throw new Error("User not found");
          // If the user does not have a stripeCustomerId, update it
          if (!user.stripeCustomerId) {
            await prisma.user.update({
              where: { id: user.id },
              data: { stripeCustomerId: customerId },
            });
          }
          let endDate = new Date();
          endDate.setMonth(endDate.getMonth() + 1);
          await prisma.subscription.upsert({
            where: { userId: user.id },
            update: {
              endDate: endDate,
            },
            create: {
              userId: user.id,
              startDate: new Date(),
              endDate: endDate,
            },
          });
          await prisma.user.update({
            where: { id: user.id },
            data: { plan: Plan.PREMIUM },
          });
        }
        break;
      case "customer.subscription.deleted":
        const subscription = await stripe.subscriptions.retrieve(data.id);
        const user = await prisma.user.findUnique({
          where: { stripeCustomerId: subscription.customer as string },
        });
        if (user) {
          await prisma.user.update({
            where: { id: user.id },
            data: { plan: Plan.FREE },
          });
        } else {
          console.error("User not found for the subscription deleted event.");
          throw new Error("User not found for the subscription deleted event.");
        }
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error) {
    console.log(`Error handling the event: ${error}`);
    throw new Error(`Error handling the event: ${error}`);
  }

  res.json({ received: true });
};
