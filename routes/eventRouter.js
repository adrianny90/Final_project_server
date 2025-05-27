import { Router } from "express";
import { createEvent } from "../controllers/event.js";

const eventRouter = Router();

eventRouter.post("/", createEvent);

export default eventRouter;
