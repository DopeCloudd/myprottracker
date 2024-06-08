import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const userClient = new PrismaClient().user;

// Get user by id
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await userClient.findUnique({
    where: { id: String(id) },
  });
  res.status(200).json(user);
};
