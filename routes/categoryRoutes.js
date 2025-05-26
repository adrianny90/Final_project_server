import { Router } from "express";
import { getAllCategries,createCategory } from "../controllers/categories.js";

const categoryRouter = Router();

categoryRouter.get("/",getAllCategries);
categoryRouter.post("/",createCategory);

export default categoryRouter;