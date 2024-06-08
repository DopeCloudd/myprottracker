import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const productClient = new PrismaClient().product;

// Get all products
export const getProducts = async (req: Request, res: Response) => {
  const products = await productClient.findMany();
  res.status(200).json(products);
};

// Get product by id
export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await productClient.findUnique({
    where: { id: parseInt(id) },
  });
  res.status(200).json(product);
};

// Get product by category id
export const getProductByCategoryId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const products = await productClient.findMany({
    where: { categoryId: parseInt(id) },
  });
  res.status(200).json(products);
};
