import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const newsletterClient = new PrismaClient().newsletter;

// Add email to newsletter
export const addEmail = async (req: Request, res: Response) => {
  const { email } = req.body;

  const record = await newsletterClient.create({
    data: {
      email,
    },
  });

  if (!record) {
    throw new Error("Email registration failed");
  }

  res.status(201).json(record);
};
