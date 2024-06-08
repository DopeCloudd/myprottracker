import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { Stripe } from "stripe";

const stripe = process.env.STRIPE_SECRET_KEY_TEST
  ? new Stripe(process.env.STRIPE_SECRET_KEY_TEST)
  : undefined;

const userClient = new PrismaClient().user;

// Register a new user
export const register = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  // Create stripe customer
  const customer = await stripe?.customers.create({
    email,
  });
  const user = await userClient.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      stripeCustomerId: customer?.id,
    },
  });
  res.status(200).json(user);
};

// Login a user
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await userClient.findUnique({
    where: { email },
  });
  if (!user) {
    res.status(400).json({ message: "Invalid email or password" });
  }
  const passwordMatch = await bcrypt.compare(password, user?.password ?? "");
  if (!passwordMatch) {
    res.status(400).json({ message: "Invalid email or password" });
  }
  res.status(200).json(user);
};
