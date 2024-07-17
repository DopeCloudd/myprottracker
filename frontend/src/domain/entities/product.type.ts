import { Brand } from "@/domain/entities/brand.type";
import { Category } from "@/domain/entities/category.types";
import { Nutrition } from "@/domain/entities/nutrition.type";

export type Product = {
  id: number;
  title: string;
  description: string;
  rating: number;
  price: number;
  lowestPrice: number;
  highestPrice: number;
  quantity: string;
  brand: Brand;
  image: ProductImage;
  url: string;
  category: Category;
  nutrition: Nutrition;
};

type ProductImage = {
  type: string;
  data: number[];
};
