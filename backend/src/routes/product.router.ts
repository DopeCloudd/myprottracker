import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductByCategoryId,
  getProductById,
  getProducts,
  getRandomProductsByCategoryId,
  updateProduct,
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
productRouter.post(
  "/product/:id",
  tryCatch(uploadMiddleware),
  tryCatch(updateProduct),
);
productRouter.delete("/product/:id", tryCatch(deleteProduct));
productRouter.post("/products/random", tryCatch(getRandomProductsByCategoryId));

export default productRouter;
