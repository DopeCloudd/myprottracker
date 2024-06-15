import { Router } from "express";

import { getUserById } from "../controllers/user.controller";
import { verifyToken } from "../middlewares/user.middleware";
import { tryCatch } from "../utils/tryCatch";

const userRouter = Router();

userRouter.get("/user", tryCatch(verifyToken), tryCatch(getUserById));

export default userRouter;
