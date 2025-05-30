import { Router } from "express";
import User from "../models/User.js";

const verifyRouter = Router();

verifyRouter.route("/:token").get(async (req, res) => {
  const { token } = req.params;
  console.log("GET request received with token:", token);
  try {
    const findUser = await User.findOne({ verificationToken: token });
    if (!findUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = await User.findOneAndUpdate(
      { verificationToken: token },
      { isVerified: true, verificationToken: null },
      { new: false }
    );

    res
      .status(200)
      .json({ message: "Verification successful", user: updatedUser });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default verifyRouter;
