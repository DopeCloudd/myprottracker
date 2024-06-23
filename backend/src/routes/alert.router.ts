import { Router } from "express";

import {
  addAlert,
  getAlerts,
  removeAlert,
} from "../controllers/alert.controller";
import { tryCatch } from "../utils/tryCatch";

const alertRouter = Router();

alertRouter.get("/alerts/:userId", tryCatch(getAlerts));
alertRouter.post("/alerts", tryCatch(addAlert));
alertRouter.delete("/alerts", tryCatch(removeAlert));

export default alertRouter;
