import { NextFunction, Request, Response } from "express";
import multer from "multer";

export const uploadMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const storage = multer.memoryStorage();
  const upload = multer({ storage }).single("image");

  upload(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(500).json({ message: err.message });
    }

    next();
  });
};
