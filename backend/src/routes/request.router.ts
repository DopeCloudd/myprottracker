import { Router } from "express";

import { addRequest, getRequests } from "../controllers/request.controller";
import { tryCatch } from "../utils/tryCatch";

const requestRouter = Router();

requestRouter.get("/request/list", tryCatch(getRequests));
requestRouter.post("/request", tryCatch(addRequest));

export default requestRouter;
