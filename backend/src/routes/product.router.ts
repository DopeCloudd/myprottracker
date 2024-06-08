import { Router } from "express";

import {
  getProductByCategoryId,
  getProductById,
  getProducts,
} from "../controllers/product.controller";

const productRouter = Router();

productRouter.get("/products", getProducts);
productRouter.get("/products/:id", getProductById);
productRouter.get("/products/category/:id", getProductByCategoryId);

export default productRouter;
