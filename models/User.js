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
});

const User = model("User", userSchema);

export default User;
