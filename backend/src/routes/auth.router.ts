import { Router } from "express";

import { login, refreshToken, register } from "../controllers/auth.controller";
import { checkEmail, verifyToken } from "../middlewares/auth.middleware";
import { tryCatch } from "../utils/tryCatch";

const authRouter: Router = Router();

authRouter.post("/auth/register", tryCatch(checkEmail), tryCatch(register));
authRouter.post("/auth/login", tryCatch(login));
authRouter.get("/auth/refresh", tryCatch(verifyToken), tryCatch(refreshToken));

export default authRouter;
