import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const requestClient = new PrismaClient().request;

// Add a request
export const addRequest = async (req: Request, res: Response) => {
  const { userId, url } = req.body;
  const request = await requestClient.create({
    data: {
      userId: userId,
      url: url,
    },
  });

  if (!request) {
    throw new Error("Request not created");
  }

  res.status(200).json(request);
};

// Get all requests
export const getRequests = async (req: Request, res: Response) => {
  const requests = await requestClient.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  res.status(200).json(requests);
};
