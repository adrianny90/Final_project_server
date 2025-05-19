import express from "express";
import cors from "cors";
import "./db/dbConnection.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import userRouter from "./routes/userRouter.js";
import itemRouter from "./routes/itemRouter.js";

const server = express();
const port = process.env.PORT || 3000;

server.use(express.json());
server.use(cors());

server.use("/users", userRouter);
server.use("/items", itemRouter);
server.use("/*splat", (req, res) =>
  res.status(404).json({ error: "Not found" })
);

server.use(errorHandler);

server.listen(port, () => console.log(`Server running on port: ${port}`));
