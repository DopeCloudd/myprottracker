import dotenv from "dotenv";
import app from "./app";

dotenv.config(); // Charge le .env par défaut
const env = process.env.NODE_ENV || "dev";
dotenv.config({ path: `.env.${env}` });

const PORT = process.env.API_PORT || 3032;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
