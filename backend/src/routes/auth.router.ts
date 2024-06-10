import { Router } from "express";

import { login, register } from "../controllers/auth.controller";
import { checkEmail } from "../middlewares/auth.middleware";
import { tryCatch } from "../utils/tryCatch";

const authRouter: Router = Router();

authRouter.post("/auth/register", tryCatch(checkEmail), tryCatch(register));
authRouter.post("/auth/login", tryCatch(login));

export default authRouter;
