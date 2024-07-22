import { PrismaClient, Product } from "@prisma/client";
import { Request, Response } from "express";

const productClient = new PrismaClient().product;
const nutritionClient = new PrismaClient().nutrition;

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
    include: { category: true, brand: true, nutrition: true },
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
    where: { categoryId: id, title: { not: null } },
    include: { category: true, brand: true, nutrition: true },
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
  const nutrition_values = values.nutrition_values;

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

  const newProductNutrition = await nutritionClient.create({
    data: {
      productId: newProduct.id,
      calories: nutrition_values.calories ?? null,
      protein: nutrition_values.protein ?? null,
      fat: nutrition_values.fat ?? null,
      saturatedFat: nutrition_values.saturatedFat ?? null,
      carbohydrates: nutrition_values.carbohydrates ?? null,
      sugar: nutrition_values.sugar ?? null,
      fiber: nutrition_values.fiber ?? null,
      salt: nutrition_values.salt ?? null,
    },
  });

  if (!newProductNutrition) {
    throw new Error("Failed to create product nutrition values.");
  }

  res.status(201).json(nutrition_values);
};

// Update a product
export const updateProduct = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const values = req.body;
  const url = String(values.url);
  const categoryId = parseInt(values.categoryId);
  const brandId = parseInt(values.brandId);
  const image = req.file;
  const nutrition_values = values.nutrition_values;
  console.log(nutrition_values);

  if (!url || !categoryId || !brandId) {
    throw new Error("Missing required fields.");
  }

  const product = await productClient.findUnique({
    where: { id: id },
  });

  if (!product) {
    throw new Error("Product not found.");
  }

  const updatedProduct = await productClient.update({
    where: { id: product.id },
    data: {
      url: url,
      categoryId: categoryId,
      brandId: brandId,
      image: image ? image.buffer : product.image,
    },
  });

  if (!updatedProduct) {
    throw new Error("Failed to update product.");
  }

  const productNutrition = await nutritionClient.findFirst({
    where: { productId: product.id },
  });

  if (!productNutrition) {
    const createdProductNutrition = await nutritionClient.create({
      data: {
        productId: product.id,
        calories: nutrition_values.calories ?? null,
        protein: nutrition_values.protein ?? null,
        fat: nutrition_values.fat ?? null,
        saturatedFat: nutrition_values.saturatedFat ?? null,
        carbohydrates: nutrition_values.carbohydrates ?? null,
        sugar: nutrition_values.sugar ?? null,
        fiber: nutrition_values.fiber ?? null,
        salt: nutrition_values.salt ?? null,
      },
    });
    if (!createdProductNutrition) {
      throw new Error("Failed to create product nutrition values.");
    }
  } else {
    const updatedProductNutrition = await nutritionClient.update({
      where: { id: productNutrition.id },
      data: {
        calories: nutrition_values.calories ?? productNutrition.calories,
        protein: nutrition_values.protein ?? productNutrition.protein,
        fat: nutrition_values.fat ?? productNutrition.fat,
        saturatedFat:
          nutrition_values.saturatedFat ?? productNutrition.saturatedFat,
        carbohydrates:
          nutrition_values.carbohydrates ?? productNutrition.carbohydrates,
        sugar: nutrition_values.sugar ?? productNutrition.sugar,
        fiber: nutrition_values.fiber ?? productNutrition.fiber,
        salt: nutrition_values.salt ?? productNutrition.salt,
      },
    });

    if (!updatedProductNutrition) {
      throw new Error("Failed to update product nutrition values.");
    }
  }

  res.status(200).json(updatedProduct);
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
    include: { nutrition: true },
  });

  res.status(204).send();
};
