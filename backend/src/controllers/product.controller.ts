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
      saturedFat: nutrition_values.saturedFat ?? null,
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
  const { id } = req.params;
  const url = String(req.body.url);
  const categoryId = parseInt(req.body.categoryId);
  const brandId = parseInt(req.body.brandId);
  const rating = parseFloat(req.body.rating);
  const parsedNutritionValues = JSON.parse(req.body.nutrition_values);
  const image = req.file;

  if (!url || !categoryId || !brandId || !rating) {
    throw new Error("Missing required fields.");
  }

  const product = await productClient.findUnique({
    where: { id: parseInt(id) },
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
      rating: rating,
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
        calories: parseFloat(parsedNutritionValues.calories) ?? null,
        protein: parseFloat(parsedNutritionValues.protein) ?? null,
        fat: parseFloat(parsedNutritionValues.fat) ?? null,
        saturedFat: parseFloat(parsedNutritionValues.saturedFat) ?? null,
        carbohydrates: parseFloat(parsedNutritionValues.carbohydrates) ?? null,
        sugar: parseFloat(parsedNutritionValues.sugar) ?? null,
        fiber: parseFloat(parsedNutritionValues.fiber) ?? null,
        salt: parseFloat(parsedNutritionValues.salt) ?? null,
      },
    });
    if (!createdProductNutrition) {
      throw new Error("Failed to create product nutrition values.");
    }
  } else {
    const updatedProductNutrition = await nutritionClient.update({
      where: { id: productNutrition.id },
      data: {
        calories:
          parseFloat(parsedNutritionValues.calories) ??
          productNutrition.calories,
        protein:
          parseFloat(parsedNutritionValues.protein) ?? productNutrition.protein,
        fat: parseFloat(parsedNutritionValues.fat) ?? productNutrition.fat,
        saturedFat:
          parseFloat(parsedNutritionValues.saturedFat) ??
          productNutrition.saturedFat,
        carbohydrates:
          parseFloat(parsedNutritionValues.carbohydrates) ??
          productNutrition.carbohydrates,
        sugar:
          parseFloat(parsedNutritionValues.sugar) ?? productNutrition.sugar,
        fiber:
          parseFloat(parsedNutritionValues.fiber) ?? productNutrition.fiber,
        salt: parseFloat(parsedNutritionValues.salt) ?? productNutrition.salt,
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

// Get random products by category id
export const getRandomProductsByCategoryId = async (
  req: Request,
  res: Response,
) => {
  const id = parseInt(req.body.categoryId);
  const limit = parseInt(req.body.limit);
  // Sélectionner tous les IDs des produits de cette catégorie
  const productsId = await productClient.findMany({
    where: { categoryId: id, title: { not: null } },
    select: { id: true },
  });
  // Sélectionner aléatoirement 6 IDs parmi ceux-ci
  const shuffledIds = productsId
    .map((p) => p.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, limit);
  // Sélectionner les produits correspondants
  const products = await productClient.findMany({
    where: { id: { in: shuffledIds } },
    include: { category: true, brand: true },
  });
  res.status(200).json(products);
};
