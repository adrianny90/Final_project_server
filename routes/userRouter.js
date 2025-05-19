import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/users.js";

const userRouter = Router();

userRouter
  .route("/")
  .get(getAllUsers)
  .post(createUser)
  .get(getUser)
  .delete(deleteUser)
  .put(updateUser);

export default userRouter;
