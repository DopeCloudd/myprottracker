import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { errorHandler } from "./middlewares/error.middleware";
import authRouter from "./routes/auth.router";
import productRouter from "./routes/product.router";
import userRouter from "./routes/user.router";

dotenv.config();

const app = express();

app.use(
  cors({
    /* origin: "http://localhost:3000",
    credentials: true, */
  }),
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
// Routes
app.use(authRouter);
app.use(userRouter);
app.use(productRouter);
// Error handler
app.use(errorHandler);

const PORT = process.env.API_PORT || 3032;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
