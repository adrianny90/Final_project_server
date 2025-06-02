import { Schema, model } from "mongoose";

const itemSchema = new Schema({
  postType: {
    type: String,
    enum: ["Offer", "Request"],
    required: [true, "Post type is required!"],
  },
  title: {
    type: String,
    required: [true, "Title is required!"],
    minLength: 1,
  },
  description: {
    type: String,
    required: [true, "Description is required!"],
    minLength: 1,
  },
  userId: {
    type: String,
    required: [true, "User ID is required!"],
  },
  category: {
    type: String,
    required: [true, "Category is required!"],
  },
  photos: [
    {
      type: String,
      required: false,
    },
  ],
  address: {
    street: { type: String, required: false },
    houseStreet: { type: String, required: false },
    postalCode: { type: String, required: false },
    city: { type: String, required: false },
    location: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ["Point"], // 'location.type' must be 'Point'
        required: false,
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: false,
      },
    },
  },

  collectionTime: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

itemSchema.index({ "address.location": "2dsphere" });

const Item = model("Item", itemSchema);

export default Item;
