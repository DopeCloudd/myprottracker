import { Router } from "express";
import { getCategories } from "../controllers/category.controller";
import { tryCatch } from "../utils/tryCatch";

const categoryRouter = Router();

categoryRouter.get("/categories", tryCatch(getCategories));

export default categoryRouter;
