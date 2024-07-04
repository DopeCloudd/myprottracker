import { Brand, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const brandClient = new PrismaClient().brand;

// Get all brands
export const getBrands = async (req: Request, res: Response) => {
  const brands: Brand[] = await brandClient.findMany();
  res.status(200).json(brands);
};

// Get brand by id
export const getBrandById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const brand = await brandClient.findUnique({
    where: { id: id },
  });
  if (!brand) {
    throw new Error("Brand not found.");
  }
  res.status(200).json(brand);
};
