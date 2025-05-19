import User from "../models/User.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const checkUser = await User.find({ email });
    if (checkUser.length)
      throw new ErrorResponse("User with such email already exists", 409);

    const user = await User.create({ firstName, lastName, email, password });
    res.status(200).json(user);
  } catch (error) {
    throw new ErrorResponse(error.message, 401);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    throw new ErrorResponse("Failed to fetch users", 500);
  }
};

export const getUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const findUser = await User.findOne({ email });

    if (!findUser)
      return res.status(404).json({ message: "Could not find user" });

    res.status(200).json(findUser);
  } catch (error) {
    throw new ErrorResponse("Something went wrong", 400);
  }
};

export const deleteUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const findUser = await User.findOne({ email });
    if (!findUser)
      return res.status(404).json({ message: "Could not find user" });
    const deletedUser = await User.findOneAndDelete({ email });
    res.status(200).json(deletedUser);
  } catch (error) {
    throw new ErrorResponse("Something went wrong", 400);
  }
};

export const updateUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const findUser = await User.findOne({ email });
    // if (!findUser.length) throw new ErrorResponse("User not found", 404);
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { firstName, lastName, password },
      { new: false }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    throw new ErrorResponse("Something went wrong", 400);
  }
};
