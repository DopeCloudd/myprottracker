import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";
import { userSchema } from "../schemas/user.schema";

const userClient = new PrismaClient().user;

const userIdSchema = userSchema.pick({ id: true });

// Get user by id
export const getUserById = async (req: Request, res: Response) => {
  const { id } = userIdSchema.parse(req.params);
  const user: User | null = await userClient.findUniqueOrThrow({
    where: { id: id },
  });
  res.status(200).json(user);
};
