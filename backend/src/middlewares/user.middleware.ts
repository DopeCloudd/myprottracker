import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  let token = req.header("Authorization");

  if (!token) {
    throw new Error("Access denied");
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length).trimStart();
  }

  const verified = jwt.verify(token, process.env.JWT_SECRET);

  if (!verified) {
    throw new Error("Invalid token");
  }

  req.body.token = verified;

  next();
};
