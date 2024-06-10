import { NextFunction, Request, Response } from "express";

type ControllerFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any>;

export function tryCatch(controller: ControllerFunction): ControllerFunction {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
}
