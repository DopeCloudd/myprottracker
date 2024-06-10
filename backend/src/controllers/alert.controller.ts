import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const alertClient = new PrismaClient().alert;

// Add an alert for a user
export const addAlert = async (req: Request, res: Response) => {
  const { userId, productId } = req.body;
  const alert = await alertClient.create({
    data: {
      userId: userId,
      productId: productId,
    },
  });
  res.status(201).json(alert);
};

// Remove an alert for a user
export const removeAlert = async (req: Request, res: Response) => {
  const { userId, productId } = req.body;
  const alert = await alertClient.deleteMany({
    where: { userId: userId, productId: productId },
  });
  res.status(200).json(alert);
};

// Get all alerts for a user
export const getAlerts = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const alerts = await alertClient.findMany({
    where: { userId: userId },
  });
  res.status(200).json(alerts);
};
