import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

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
