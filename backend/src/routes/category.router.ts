import { Router } from "express";
import {
  getCategories,
  getCategoryById,
  getCategoryByName,
} from "../controllers/category.controller";
import { tryCatch } from "../utils/tryCatch";

const categoryRouter = Router();

categoryRouter.get("/categories", tryCatch(getCategories));
categoryRouter.get("/category/id/:id", tryCatch(getCategoryById));
categoryRouter.get("/category/name/:name", tryCatch(getCategoryByName));

export default categoryRouter;
