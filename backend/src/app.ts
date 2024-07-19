import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";
import { errorHandler } from "./middlewares/error.middleware";
import alertRouter from "./routes/alert.router";
import authRouter from "./routes/auth.router";
import brandRouter from "./routes/brand.router";
import categoryRouter from "./routes/category.router";
import favoriteRouter from "./routes/favorite.router";
import productRouter from "./routes/product.router";
import scrapingRouter from "./routes/scraping.router";

const app: Application = express();

app.use(bodyParser.json());
app.use(
  cors({
    /* origin: "http://localhost:3000", */
    credentials: true,
  }),
);
app.use(helmet());
app.use(compression());
app.use(cookieParser());
// Routes
app.use(authRouter);
app.use(categoryRouter);
app.use(productRouter);
app.use(favoriteRouter);
app.use(alertRouter);
app.use(brandRouter);
app.use(scrapingRouter);
// Error handler
app.use(errorHandler);

export default app;
