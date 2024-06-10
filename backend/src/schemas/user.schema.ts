import { z } from "zod";

export const userSchema = z.object({
  userId: z.string(),
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  emailToken: z.string(),
  password: z.string().min(6),
  plan: z.string(),
  stripeCustomerId: z.string(),
  stripeSubscriptionId: z.string(),
});
