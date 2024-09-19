import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";
import path from "path";
import { renderLowestPriceEmail, renderWelcomeEmail } from "./mail/renderEmail";
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

// Configuration CORS
const corsOptions = {
  origin: ["https://www.myprottracker.com", "https://myprottracker.com"], // Autoriser ces deux origines
  methods: ["GET", "POST", "PUT", "DELETE"], // Les méthodes autorisées
  credentials: true, // Autorise l'envoi de cookies ou de tokens d'authentification
  allowedHeaders: ["Content-Type", "Authorization"], // Autorise ces headers spécifiques
};

app.use(cors(corsOptions));
// Middleware spécifique pour Stripe Webhook
app.use("/stripe/webhook", express.raw({ type: "application/json" }));
app.use(bodyParser.json());
app.use(helmet());
app.use(compression());
app.use(cookieParser());
// Routes
app.use("/api", authRouter);
app.use("/api", categoryRouter);
app.use("/api", productRouter);
app.use("/api", favoriteRouter);
app.use("/api", alertRouter);
app.use("/api", brandRouter);
app.use("/api", scrapingRouter);
app.use("/api", requestRouter);
app.use("/api", statRouter);
app.use("/api", stripeRouter);
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

// Route pour prévisualiser l'email de lowest price
app.get("/preview/lowest", (req, res) => {
  const htmlContent = renderLowestPriceEmail({
    productId: "1",
  });
  res.send(htmlContent);
});

export default app;
