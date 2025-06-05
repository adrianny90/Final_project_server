import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required!"],
    minLength: 1,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required!"],
    min: 1,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },
  address: {
    street: { type: String, required: false, default: "" },
    houseStreet: { type: String, required: false, default: "" },
    postalCode: { type: String, required: false, default: "" },
    city: { type: String, required: false, default: "" },
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
        default: 0,
      },
    },
  },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  createdAt: { type: Date, default: Date.now },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref:"Item",
      required: false,
    },
  ],
});

const User = model("User", userSchema);

export default User;
