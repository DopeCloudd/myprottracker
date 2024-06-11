import { z } from "zod";

export const loginUserDataSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const loginUserResponseSchema = z.object({
  user: loginUserDataSchema,
  token: z.string(),
});

export const registerUserDataSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const registerUserResponseSchema = z.object({
  success: z.boolean(),
});
