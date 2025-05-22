import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/ErrorResponse.js";

const verifyToken = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) throw new ErrorResponse("Unauthorized", 401);

  const payload = jwt.verify(token, process.env.JWT_SECRET);

  req.userId = payload.id;
  req.userRole = payload.role;

  next();
};

export default verifyToken;
