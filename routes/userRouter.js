import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getOwners,
  getRelatedUsers,
  updateUser,
} from "../controllers/users.js";

const userRouter = Router();

userRouter

  .get("/", getAllUsers)
  .post("/", createUser)
  .post("/items", getOwners)
  .post("/related", getRelatedUsers)
  .delete("/", deleteUser)
  .put("/", updateUser);

export default userRouter;
