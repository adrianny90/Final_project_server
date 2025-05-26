import { Router } from "express";
import {
  createItem,
  deleteItem,
  getAllItems,
  getItem,
  updateItem,
  getItemsByCategory
} from "../controllers/items.js";

const itemRouter = Router();

itemRouter
  .route("/")
  .get(getAllItems)
  .post(createItem)
  .get(getItem)
  .delete(deleteItem)
  .put(updateItem)

itemRouter
  .route("/category/:categoryName")
  .get(getItemsByCategory);

export default itemRouter;
