import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { Stripe } from "stripe";
import { userSchema } from "../schemas/user.schema";
import { generateToken } from "../services/token";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST ?? "");

const userClient = new PrismaClient().user;

const userRegisterSchema = userSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
  password: true,
});

const userLoginSchema = userSchema.pick({
  email: true,
  password: true,
});

// Register a new user
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { firstName, lastName, email, password } = userRegisterSchema.parse(
    req.body,
  );
  // Hash the password
  const hashedPassword: string = await bcrypt.hash(password, 10);
  // Create stripe customer
  const customer: Stripe.Customer = await stripe.customers.create({
    email,
  });
  const user: User | null = await userClient.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      stripeCustomerId: customer?.id,
    },
  });

  if (!user) {
    throw new Error("User registration failed");
  }

  res.status(200).json({ success: true });
};

// Login a user
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = userLoginSchema.parse(req.body);
  const user: User | null = await userClient.findUniqueOrThrow({
    where: { email },
  });
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const passwordMatch: boolean = await bcrypt.compare(
    password,
    user?.password ?? "",
  );
  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user.id);

  res.status(200).json({
    accessToken: token,
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  });
};
