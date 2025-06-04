import Messages from "../models/Messages.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const createMessage = async (req, res) => {
  const { content, receiverId, senderId, itemId, ownerId } = req.body;

  try {
    const message = await Messages.create({
      content,
      receiverId,
      senderId,
      itemId,
      ownerId,
    });
    res.status(200).json(message);
  } catch (error) {
    console.error("Error in create message:", error);
    return res.status(500).json({ message: error.message || "Server Error" });
  }
};

export const getMessage = async (req, res) => {
  const { _id } = req.body;

  try {
    const messages = await Messages.find({
      $or: [{ receiverId: _id }, { senderId: _id }],
    });
    if (!messages) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(messages);
    // console.log(messages);
  } catch (error) {
    console.error("Error in create message:", error);
    return res.status(500).json({ message: error.message || "Server Error" });
  }
};
