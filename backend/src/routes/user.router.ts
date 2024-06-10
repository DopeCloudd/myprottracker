import { Router } from "express";

import { getUserById } from "../controllers/user.controller";
import { tryCatch } from "../utils/tryCatch";

const userRouter = Router();

userRouter.get("/user/:id", tryCatch(getUserById));

export default userRouter;
