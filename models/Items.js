import { Schema, model } from "mongoose";

const itemSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required!"],
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
  photos: [
    {
      type: String,
    },
  ],
  address: {
    street: { type: String, required: true },
    houseStreet: { type: String, required: true },
    postalCode: { type: String, required: true },
    city: { type: String, required: true },
    location: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ["Point"], // 'location.type' must be 'Point'
        required: true,
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },

  collectionTime: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

itemSchema.index({ "address.location": "2dsphere" });

const Item = model("Item", itemSchema);

export default Item;
