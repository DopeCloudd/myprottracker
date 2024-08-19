import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";
import path from "path";
import { renderWelcomeEmail } from "./mail/renderEmail";
import { errorHandler } from "./middlewares/error.middleware";
import alertRouter from "./routes/alert.router";
import authRouter from "./routes/auth.router";
import brandRouter from "./routes/brand.router";
import categoryRouter from "./routes/category.router";
import favoriteRouter from "./routes/favorite.router";
import productRouter from "./routes/product.router";
import requestRouter from "./routes/request.router";
import scrapingRouter from "./routes/scraping.router";
import statRouter from "./routes/statistics.router";
import stripeRouter from "./routes/stripe.router";

const app: Application = express();

app.use(stripeRouter);
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
app.use(requestRouter);
app.use(statRouter);
// Error handler
app.use(errorHandler);

// Servir les fichiers statiques du dossier 'fonts'
app.use(
  "/fonts",
  express.static(path.join(__dirname, "mail/emailTemplates/fonts")),
);

// Route pour prévisualiser l'email de bienvenue
app.get("/preview/welcome-email", (req, res) => {
  const htmlContent = renderWelcomeEmail({
    email: "test@gmail.com",
  });
  res.send(htmlContent);
});

export default app;
