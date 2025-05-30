import User from "../models/User";

import { Router } from "express";

const verifyRouter = Router();

verifyRouter.route("/:token").get(async (req, res) => {
  const { token } = req.params;
  console.log("GET request received with token:", token);
  try {
    const findUser = await User.findOne({ verificationToken });

    if (!findUser) throw new ErrorResponse("User not found", 404);
    const updatedUser = await User.findOneAndUpdate(
      { token },
      { isVerified: true },
      { new: false }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    throw new ErrorResponse("Something went wrong", 400);
  }
});

export default verifyRouter;
