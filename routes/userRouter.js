import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getOwners,
  updateUser,
} from "../controllers/users.js";

const userRouter = Router();

userRouter

  .get("/", getAllUsers)
  .post("/", createUser)
  .post("/items", getOwners)
  .delete("/", deleteUser)
  .put("/", updateUser);

export default userRouter;
