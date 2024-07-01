import { Router } from "express";
import {
  createProduct,
  getProductByCategoryId,
  getProductById,
  getProducts,
} from "../controllers/product.controller";
import { uploadMiddleware } from "../middlewares/upload.middleware";
import { tryCatch } from "../utils/tryCatch";

const productRouter = Router();

productRouter.get("/products", tryCatch(getProducts));
productRouter.get("/products/:id", tryCatch(getProductById));
productRouter.get("/products/category/:id", tryCatch(getProductByCategoryId));
productRouter.post(
  "/product",
  tryCatch(uploadMiddleware),
  tryCatch(createProduct),
);

export default productRouter;
