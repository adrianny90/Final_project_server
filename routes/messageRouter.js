import { Router } from "express";
import { createMessage } from "../controllers/message.js";

const messageRouter = Router();

//endpoints

messageRouter.post("/", createMessage);

export default messageRouter;
