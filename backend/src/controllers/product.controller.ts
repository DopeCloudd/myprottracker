import { PrismaClient, Product } from "@prisma/client";
import { Request, Response } from "express";

const productClient = new PrismaClient().product;

// Get all products
export const getProducts = async (req: Request, res: Response) => {
  const products: Product[] = await productClient.findMany({
    include: { category: true },
  });
  res.status(200).json(products);
};

// Get product by id
export const getProductById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const product = await productClient.findUnique({
    where: { id: id },
  });
  if (!product) {
    throw new Error("Product not found.");
  }
  res.status(200).json(product);
};

// Get product by category id
export const getProductByCategoryId = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const products = await productClient.findMany({
    where: { categoryId: id },
  });
  res.status(200).json(products);
};

// Create a new product
export const createProduct = async (req: Request, res: Response) => {
  const { url, brand, categoryId } = req.body;
  const image = req.file?.buffer;

  if (!url || !categoryId || !brand || !image) {
    throw new Error("Missing required fields.");
  }

  const newProduct = await productClient.create({
    data: {
      url: String(url),
      categoryId: parseInt(categoryId),
      brand: String(brand),
      image,
    },
  });

  if (!newProduct) {
    throw new Error("Failed to create product.");
  }

  res.status(201).json(newProduct);
};
