import { Router } from "express";

import { login, register } from "../controllers/auth.controller";
import { checkEmail } from "../middlewares/auth.middleware";

const authRouter = Router();

authRouter.post("/register", checkEmail, register);
authRouter.post("/login", login);

export default authRouter;
