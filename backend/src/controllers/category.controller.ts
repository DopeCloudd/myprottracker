import { Category, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { categoryNameSchema } from "../schemas/category.schema";

const categoryClient = new PrismaClient().category;

// Get all categories
export const getCategories = async (req: Request, res: Response) => {
  const categories: Category[] = await categoryClient.findMany();
  res.status(200).json(categories);
};

// Get category by id
export const getCategoryById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const category = await categoryClient.findUnique({
    where: { id: id },
  });
  if (!category) {
    throw new Error("Category not found");
  }
  res.status(200).json(category);
};

// Get category by name
export const getCategoryByName = async (req: Request, res: Response) => {
  const { name } = categoryNameSchema.parse(req.params);
  const category = await categoryClient.findFirst({
    where: { name: name },
  });
  if (!category) {
    throw new Error("Category not found");
  }
  res.status(200).json(category);
};
