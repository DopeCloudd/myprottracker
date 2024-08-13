import { Router } from "express";

import { getStats } from "../controllers/statistics.controller";
import { tryCatch } from "../utils/tryCatch";

const statRouter = Router();

statRouter.get("/statistics", tryCatch(getStats));

export default statRouter;
