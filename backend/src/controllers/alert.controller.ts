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
    include: { product: true },
  });

  if (!alert) {
    throw new Error("Alert not created");
  }

  res.status(201).json(alert.product);
};

// Remove an alert for a user
export const removeAlert = async (req: Request, res: Response) => {
  const { userId, productId } = req.body;
  await alertClient.deleteMany({
    where: { userId: userId, productId: productId },
  });
  const alerts = await alertClient.findMany({
    where: { userId: userId },
    include: {
      product: true,
    },
  });

  const products = alerts.map((alert) => alert.product);

  res.status(200).json(products);
};

// Get all alerts for a user
export const getAlerts = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const alerts = await alertClient.findMany({
    where: { userId: userId },
    include: { product: true },
  });
  const products = alerts.map((alert) => alert.product);
  res.status(200).json(products);
};
