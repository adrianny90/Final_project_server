import { Router } from "express";
import {
  createItem,
  deleteItem,
  getAllItems,
  getItem,
  getUserAllItem,
  getUserItem,
  updateItem,
  bulkCreateItems
} from "../controllers/items.js";

const itemRouter = Router();

itemRouter.route("/").get(getAllItems).post(createItem);

itemRouter.route("/:id").get(getItem).delete(deleteItem).put(updateItem);
itemRouter.post("/user", getUserItem);
itemRouter.post("/userAll", getUserAllItem);
itemRouter.post("/bulk", bulkCreateItems);

export default itemRouter;




