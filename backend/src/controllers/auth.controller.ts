import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { Stripe } from "stripe";
import { sendWelcomeEmail } from "../mail/sendEmail";
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

const userIdSchema = userSchema.pick({ id: true });

type UserResponse = Pick<
  User,
  | "id"
  | "email"
  | "firstName"
  | "lastName"
  | "role"
  | "subscription"
  | "createdAt"
>;

type UserLoginData = Pick<
  User,
  | "id"
  | "email"
  | "firstName"
  | "lastName"
  | "password"
  | "role"
  | "subscription"
  | "createdAt"
>;

// Register a new user
export const register = async (req: Request, res: Response) => {
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

  await sendWelcomeEmail(email, email);

  res.status(200).json({ success: true });
};

// Login a user
export const login = async (req: Request, res: Response) => {
  const { email, password } = userLoginSchema.parse(req.body);
  const user: UserLoginData | null = await userClient.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      password: true,
      role: true,
      subscription: true,
      createdAt: true,
    },
  });
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const passwordMatch: boolean = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user.id);

  res.status(200).json({
    token: token,
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      subscription: user.subscription,
      createdAt: user.createdAt,
    },
  });
};

// Refresh token
export const refreshToken = async (req: Request, res: Response) => {
  const { id } = userIdSchema.parse(req.body.token);
  const user: UserResponse | null = await userClient.findUnique({
    where: { id: id },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      subscription: true,
      createdAt: true,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }
  const newToken = generateToken(user.id);
  res.status(200).json({ token: newToken, user });
};
