import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ZodError) {
    const errors = err.errors.map((error) => ({
      path: error.path.join("."),
      message: error.message,
    }));

    res.status(400).json({
      message: "Zod Validation error",
      errors,
    });
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      res.status(400).json({
        message: "Prisma error",
        err,
      });
    }
  } else {
    res.status(400).send({ errors: [{ message: err.message }] });
  }
};
