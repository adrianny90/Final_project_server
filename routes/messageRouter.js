import { Router } from "express";
import { createMessage, getMessage } from "../controllers/message.js";

const messageRouter = Router();

//endpoints

messageRouter.post("/", createMessage);
messageRouter.post("/user", getMessage);

export default messageRouter;
