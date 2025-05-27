import { Schema, model } from "mongoose";
import { AutoIncrementPlugin } from "../db/dbConnection.js";

const eventSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required!"],
    minLength: 1,
  },
  startTime: {
    type: String,
    required: [true, "Start time is required!"],
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
    required: [false, "Category is required!"],
  },
  photos: [
    {
      type: String,
      required: false,
    },
  ],
  //   address: {
  //     street: { type: String, required: false },
  //     houseStreet: { type: String, required: false },
  //     postalCode: { type: String, required: false },
  //     city: { type: String, required: false },
  //     location: {
  //       type: {
  //         type: String, // Don't do `{ location: { type: String } }`
  //         enum: ["Point"], // 'location.type' must be 'Point'
  //         required: false,
  //         default: "Point",
  //       },
  //       coordinates: {
  //         type: [Number],
  //         required: false,
  //       },
  //     },
  //   },
  idEvent: {
    type: Number,
  },
  eventDate: {
    type: Date,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// eventSchema.plugin(AutoIncrementPlugin, { inc_field: "idEvent" });

eventSchema.index({ "address.location": "2dsphere" });

const Event = model("Events", eventSchema);

export default Event;
