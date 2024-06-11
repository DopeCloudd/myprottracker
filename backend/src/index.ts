import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = process.env.API_PORT || 3032;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
