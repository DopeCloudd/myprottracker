import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// Get Statistics
export const getStats = async (req: Request, res: Response) => {
  const count_products = await prisma.product.count();
  const count_categories = await prisma.category.count();
  const count_brands = await prisma.brand.count();
  const count_requests = await prisma.request.count();
  const count_users = await prisma.user.count();

  res.status(200).json({
    count_products,
    count_categories,
    count_brands,
    count_requests,
    count_users,
  });
};
