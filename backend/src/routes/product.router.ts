import { Router } from "express";

import {
  getProductByCategoryId,
  getProductById,
  getProducts,
} from "../controllers/product.controller";
import uploadMiddleware from "../middlewares/upload.middleware";
import { tryCatch } from "../utils/tryCatch";

const productRouter = Router();

productRouter.get("/products", tryCatch(getProducts));
productRouter.get("/products/:id", tryCatch(getProductById));
productRouter.get("/products/category/:id", tryCatch(getProductByCategoryId));
productRouter.post("/products", uploadMiddleware, tryCatch(getProducts));

export default productRouter;
