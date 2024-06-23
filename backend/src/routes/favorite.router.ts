import { Router } from "express";

import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../controllers/favorite.controller";
import { tryCatch } from "../utils/tryCatch";

const favoriteRouter = Router();

favoriteRouter.get("/favorites/:userId", tryCatch(getFavorites));
favoriteRouter.post("/favorites", tryCatch(addFavorite));
favoriteRouter.delete("/favorites", tryCatch(removeFavorite));

export default favoriteRouter;
