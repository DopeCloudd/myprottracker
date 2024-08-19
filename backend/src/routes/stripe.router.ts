import bodyParser from "body-parser";
import { Router } from "express";
import { webhook } from "../controllers/stripe.controller";
import { tryCatch } from "../utils/tryCatch";

const stripeRouter = Router();

stripeRouter.post(
  "/stripe/webhook",
  bodyParser.raw({ type: "application/json" }),
  tryCatch(webhook),
);

export default stripeRouter;
