import { Category, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { categoryIdSchema } from "../schemas/category.schema";

const categoryClient = new PrismaClient().category;

// Get all categories
export const getCategories = async (req: Request, res: Response) => {
  const categories: Category[] = await categoryClient.findMany();
  res.status(200).json(categories);
};

// Get category by id
export const getCategoryById = async (req: Request, res: Response) => {
  const { id } = categoryIdSchema.parse(req.params);
  const category = await categoryClient.findUnique({
    where: { id: id },
  });
  if (!category) {
    throw new Error("Category not found");
  }
  res.status(200).json(category);
};
