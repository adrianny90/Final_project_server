import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./db/dbConnection.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import userRouter from "./routes/userRouter.js";
import itemRouter from "./routes/itemRouter.js";
import upload from "./middlewares/upload.js";
import authRouter from "./routes/authRouter.js";
import categoryRouter from "./routes/categoryRoutes.js";

const server = express();
const port = process.env.PORT || 3000;

server.use(express.json());
server.use(cors({ origin: "http://localhost:5173", credentials: true }));
server.use(cookieParser());

server.use("/auth", authRouter);
server.use("/users", userRouter);
server.use("/items", itemRouter);
server.use("/categroies",categoryRouter);

server.post("/image-upload", upload.single("img"), (req, res) => {
  console.log(req.file);
  // Example how to store the image url in your database.
  // const product = await ProductSchema.findByIdAndUpdate({img:req.file.secure_url, imgPublicId: req.file.public_id })
  res.json({ msg: "Image uploaded", img: req.file.secure_url });
});
server.use("/*splat", (req, res) =>
  res.status(404).json({ error: "Not found" })
);

server.use(errorHandler);

server.listen(port, () => console.log(`Server running on port: ${port}`));
