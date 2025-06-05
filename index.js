import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./db/dbConnection.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import userRouter from "./routes/userRouter.js";
import itemRouter from "./routes/itemRouter.js";
import upload from "./middlewares/upload.js";
import authRouter from "./routes/authRouter.js";
import messageRouter from "./routes/messageRouter.js";
import eventRouter from "./routes/eventRouter.js";
import verifyRouter from "./routes/verifyRouter.js";
import compression from "compression";

const server = express();
const port = process.env.PORT || 3000;

server.use(compression());
server.use(express.json());
server.use(
  cors({ origin: `${process.env.ALLOWED_ORIGIN}`, credentials: true })
);
server.use(cookieParser());
server.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
server.use("/auth", authRouter);
server.use("/users", userRouter);
server.use("/items", itemRouter);
server.use("/message", messageRouter);
server.use("/event", eventRouter);
server.use("/verify", verifyRouter);

server.use(
  "/video",
  express.static("public/video", {
    setHeaders: (res, path) => {
      res.set({
        "Cache-Control": "public, max-age=31536000, immutable",
        ETag: true,
        "Last-Modified": new Date("2025-01-01").toUTCString(),
        Expires: new Date(Date.now() + 31536000 * 1000).toUTCString(),
        "CDN-Cache-Control": "public, max-age=31536000",
        "Cloudflare-CDN-Cache-Control": "public, max-age=31536000",
      });
    },
  })
);
server.use("/video", (req, res) => {
  res.status(404).json({ error: "Video not found" });
});

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
