import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const userClient = new PrismaClient().user;

// Check if email is already in use
export const checkEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.body;
  const user = await userClient.findUnique({
    where: { email },
  });
  if (user) {
    throw new Error("Email is already in use");
  }
  next();
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  let token = req.header("Authorization");

  if (!token) {
    throw new Error("Access denied");
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length).trimStart();
  }

  const verified = jwt.verify(token, process.env.JWT_SECRET);

  if (!verified) {
    throw new Error("Invalid token");
  }

  next();
};
