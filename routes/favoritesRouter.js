import express from "express";
import { addFavorite, removeFavorite, getFavorites } from "../controllers/favorites.js";

const favoritesRouter = express.Router();

favoritesRouter.post("/add", addFavorite);
favoritesRouter.post("/remove", removeFavorite);
favoritesRouter.get("/:userId", getFavorites);

export default favoritesRouter;