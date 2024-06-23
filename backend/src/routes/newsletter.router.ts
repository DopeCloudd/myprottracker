import { Router } from "express";

import { getFavorites } from "../controllers/favorite.controller";
import { tryCatch } from "../utils/tryCatch";

const newsletterRouter = Router();

newsletterRouter.post("/newsletter", tryCatch(getFavorites));

export default newsletterRouter;
