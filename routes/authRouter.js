import { Router } from "express";
import { getUser, createUser, signOut, me } from "../controllers/users.js";
import validateSchema from "../middlewares/validateSchema.js";
import { signInSchema, signUpSchema } from "../joi/schemas.js";
import verifyToken from "../middlewares/verifyToken.js";

const authRouter = Router();

//endpoints
authRouter.get("/me", verifyToken, me);
authRouter.post("/signin", validateSchema(signInSchema), getUser);
authRouter.post("/signup", validateSchema(signUpSchema), createUser);
authRouter.delete("/signout", signOut);

export default authRouter;
