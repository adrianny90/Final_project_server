import { Schema, model } from "mongoose";

const itemSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
    minLength: 1,
  },
  description: {
    type: String,
    required: [true, "Description is required!"],
    min: 1,
  },
  userId: {
    type: String,
    required: [true, "User id missing"],
    unique: true,
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  img: {
    type: String,
  },
  imgPublicId: { type: String },
});

const Item = model("Item", itemSchema);

export default Item;
