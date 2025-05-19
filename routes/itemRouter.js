import { Router } from "express";
import {
  createItem,
  deleteItem,
  getAllItems,
  getItem,
  updateItem,
} from "../controllers/items.js";

const itemRouter = Router();

itemRouter
  .route("/")
  .get(getAllItems)
  .post(createItem)
  .get(getItem)
  .delete(deleteItem)
  .put(updateItem);

export default itemRouter;
