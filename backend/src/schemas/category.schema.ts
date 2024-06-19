import { z } from "zod";

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
});

export const categoryIdSchema = categorySchema.pick({ id: true });

export const categoryNameSchema = categorySchema.pick({ name: true });
