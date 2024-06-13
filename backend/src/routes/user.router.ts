import { Router } from "express";

import { getUserById } from "../controllers/user.controller";
import { verifyToken } from "../middlewares/auth.middleware";
import { tryCatch } from "../utils/tryCatch";

const userRouter = Router();

userRouter.get("/user/:id", verifyToken, tryCatch(getUserById));

export default userRouter;
