import bodyParser from "body-parser";
import { Router } from "express";
import {
  createCheckoutSession,
  webhook,
} from "../controllers/stripe.controller";
import { tryCatch } from "../utils/tryCatch";

const stripeRouter = Router();

stripeRouter.post(
  "/stripe/webhook",
  bodyParser.raw({ type: "application/json" }),
  tryCatch(webhook),
);
stripeRouter.post("/stripe/checkout-session", tryCatch(createCheckoutSession));

export default stripeRouter;
