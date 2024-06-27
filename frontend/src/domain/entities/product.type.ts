import { Category } from "@/domain/entities/category.types";

export type Product = {
  id: number;
  title: string;
  description: string;
  rating: number;
  price: number;
  lowestPrice: number;
  highestPrice: number;
  quantity: string;
  brand: string;
  image: ProductImage;
  url: string;
  category: Category;
};

type ProductImage = {
  type: string;
  data: number[];
};
