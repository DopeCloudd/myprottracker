import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";
import { userSchema } from "../schemas/user.schema";

const userClient = new PrismaClient().user;

type UserResponse = Pick<
  User,
  "id" | "email" | "firstName" | "lastName" | "createdAt"
>;

const userIdSchema = userSchema.pick({ id: true });

// Get user data by id parse in the token middleware
export const getUserById = async (req: Request, res: Response) => {
  const { id } = userIdSchema.parse(req.body.token);
  const user: UserResponse | null = await userClient.findUnique({
    where: { id: id },
  });
  if (!user) {
    throw new Error("User not found");
  }
  res.status(200).json(user);
};
