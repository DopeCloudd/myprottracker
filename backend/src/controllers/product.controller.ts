import { PrismaClient, Product } from "@prisma/client";
import { Request, Response } from "express";
import { categorySchema } from "../schemas/category.schema";
import { productSchema } from "../schemas/product.schema";

const productClient = new PrismaClient().product;

// Schema for getting a product by id or by category id
const productIdSchema = productSchema.pick({ id: true });
const categoryIdSchema = categorySchema.pick({ id: true });

// Get all products
export const getProducts = async (req: Request, res: Response) => {
  const products: Product[] = await productClient.findMany();
  res.status(200).json(products);
};

// Get product by id
export const getProductById = async (req: Request, res: Response) => {
  const { id } = productIdSchema.parse(req.params);
  const product = await productClient.findUniqueOrThrow({
    where: { id: id },
  });
  res.status(200).json(product);
};

// Get product by category id
export const getProductByCategoryId = async (req: Request, res: Response) => {
  const { id } = categoryIdSchema.parse(req.params);
  const products = await productClient.findMany({
    where: { categoryId: id },
  });
  res.status(200).json(products);
};
