import { Router } from "express";
import { getBrandById, getBrands } from "../controllers/brand.controller";
import { tryCatch } from "../utils/tryCatch";

const brandRouter = Router();

brandRouter.get("/brands", tryCatch(getBrands));
brandRouter.get("/brands/:id", tryCatch(getBrandById));

export default brandRouter;
