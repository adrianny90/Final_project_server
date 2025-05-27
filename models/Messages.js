import { Schema, model } from "mongoose";
import { AutoIncrementPlugin } from "../db/dbConnection.js";

const messageSchema = new Schema({
  senderId: {
    type: String,
    required: [true, "ID is required!"],
    minLength: 1,
  },
  receiverId: {
    type: String,
    required: [true, "ID is required!"],
    minLength: 1,
  },
  content: {
    type: String,
    required: [true, "Content is required!"],
  },
  itemId: {
    type: String,
    required: [true, "Item id is required!"],
  },

  id: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
messageSchema.plugin(AutoIncrementPlugin, { inc_field: "id" });

const Messages = model("Messages", messageSchema);

export default Messages;
