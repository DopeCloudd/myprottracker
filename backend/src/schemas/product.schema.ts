import { z } from "zod";

export const productSchema = z.object({
  productId: z.number(),
  id: z.number(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  lowestPrice: z.number(),
  highestPrice: z.number(),
  quantity: z.string(),
  brand: z.string(),
  categoryId: z.number(),
  url: z.string(),
  imageUrl: z.string(),
});
