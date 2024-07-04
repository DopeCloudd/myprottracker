import { PrismaClient, Product } from "@prisma/client";
import { Request, Response } from "express";

const productClient = new PrismaClient().product;

// Get all products
export const getProducts = async (req: Request, res: Response) => {
  const products: Product[] = await productClient.findMany({
    include: { category: true, brand: true },
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
  const values = req.body;
  const url = String(values.url);
  const categoryId = parseInt(values.categoryId);
  const brandId = parseInt(values.brandId);
  const image = req.file;

  if (!url || !categoryId || !brandId || !image) {
    throw new Error("Missing required fields.");
  }

  const existingProduct = await productClient.findFirst({
    where: { url: url },
  });

  if (existingProduct) {
    throw new Error("Product already exists.");
  }

  const newProduct = await productClient.create({
    data: {
      url: url,
      categoryId: categoryId,
      brandId: brandId,
      image: image.buffer,
    },
  });

  if (!newProduct) {
    throw new Error("Failed to create product.");
  }

  res.status(201).json(newProduct);
};

// Delete a product
export const deleteProduct = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const product = await productClient.findUnique({
    where: { id: id },
  });

  if (!product) {
    throw new Error("Product not found.");
  }

  await productClient.delete({
    where: { id: id },
  });

  res.status(204).send();
};
