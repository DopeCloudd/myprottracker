import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { productSchema } from "../schemas/product.schema";
import { userSchema } from "../schemas/user.schema";

const favoriteClient = new PrismaClient().favorite;

const productIdSchema = productSchema.pick({ productId: true });
const userIdSchema = userSchema.pick({ userId: true });
const favoriteSchema = productIdSchema.merge(userIdSchema);

// Add a favorite for a user
export const addFavorite = async (req: Request, res: Response) => {
  const { userId, productId } = favoriteSchema.parse(req.body);
  const favorite = await favoriteClient.create({
    data: {
      userId: userId,
      productId: productId,
    },
    include: { product: true },
  });
  res.status(201).json(favorite.product);
};

// Remove a favorite for a user
export const removeFavorite = async (req: Request, res: Response) => {
  const { userId, productId } = favoriteSchema.parse(req.body);
  await favoriteClient.deleteMany({
    where: { userId: userId, productId: productId },
  });
  const favorites = await favoriteClient.findMany({
    where: { userId: userId },
    include: {
      product: true,
    },
  });

  const products = favorites.map((favorite) => favorite.product);

  res.status(200).json(products);
};

// Get all favorites for a user
export const getFavorites = async (req: Request, res: Response) => {
  const { userId } = userIdSchema.parse(req.params);
  const favorites = await favoriteClient.findMany({
    where: { userId: userId },
    include: { product: true },
  });
  const products = favorites.map((favorite) => favorite.product);
  res.status(200).json(products);
};
