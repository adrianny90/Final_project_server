import express from "express";
import cors from "cors";
const server = express();
const port = process.env.PORT || 3000;

server.use(express.json());
server.use(cors());

server.listen(port, () => console.log(`Server running on port: ${port}`));
