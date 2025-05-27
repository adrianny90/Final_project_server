import Messages from "../models/Messages.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const createMessage = async (req, res) => {
  const { content, receiverId, senderId, itemId } = req.body;

  try {
    const message = await Messages.create({
      content,
      receiverId,
      senderId,
      itemId,
    });
    res.status(200).json(message);
  } catch (error) {
    console.error("Error in create message:", error);
    return res.status(500).json({ message: error.message || "Server Error" });
  }
};
