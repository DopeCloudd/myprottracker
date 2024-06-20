import { Router } from "express";

import { login, refreshToken, register } from "../controllers/auth.controller";
import { checkEmail, verifyToken } from "../middlewares/auth.middleware";
import { tryCatch } from "../utils/tryCatch";

const authRouter: Router = Router();

authRouter.post("/auth/register", tryCatch(checkEmail), tryCatch(register));
authRouter.post("/auth/login", tryCatch(login));
authRouter.post(
  "/auth/refresh-token",
  tryCatch(verifyToken),
  tryCatch(refreshToken),
);

export default authRouter;
