import { Router } from "express";

import { notifyLowerPrice } from "../controllers/queu.controller";
import { tryCatch } from "../utils/tryCatch";

const queuRouter = Router();

queuRouter.post("/queu/mail/lowestPrice", tryCatch(notifyLowerPrice));

export default queuRouter;
