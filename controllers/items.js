import Item from "../models/Items.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const createItem = async (req, res) => {
  const { name, description, userId, category } = req.body;

  try {
    const checkItem = await Item.find({ name });
    if (checkItem.length)
      throw new ErrorResponse("Item with such name already exists", 409);

    const item = await Item.create({ name, description, userId, category });
    res.status(200).json(item);
  } catch (error) {
    throw new ErrorResponse(error.message, 401);
  }
};

export const getAllItems = async (req, res) => {
  try {
    const allItems = await Item.find();
    res.status(200).json(allItems);
  } catch (error) {
    throw new ErrorResponse("Failed to fetch users", 500);
  }
};

export const getItem = async (req, res) => {
  const { name, description, userId, category } = req.body;

  try {
    const findItem = await Item.findOne({ name });

    if (!findItem)
      return res.status(404).json({ message: "Could not find item" });

    res.status(200).json(findItem);
  } catch (error) {
    throw new ErrorResponse("Something went wrong", 400);
  }
};

export const deleteItem = async (req, res) => {
  const { name, description, userId, category } = req.body;

  try {
    const findItem = await Item.findOne({ name });
    if (!findItem)
      return res.status(404).json({ message: "Could not find item" });
    const deletedItem = await Item.findOneAndDelete({ name });
    res.status(200).json(deletedItem);
  } catch (error) {
    throw new ErrorResponse("Something went wrong", 400);
  }
};

export const updateItem = async (req, res) => {
  const { name, description, userId, category } = req.body;

  try {
    const findItem = await Item.findOne({ name });
    if (!findItem) throw new ErrorResponse("Item not found", 404);
    const updatedItem = await Item.findOneAndUpdate(
      { name },
      { description, category },
      { new: true }
    );
    res.status(200).json(updatedItem);
  } catch (error) {
    throw new ErrorResponse(`Something went wrong: ${error.message} `, 400);
  }
};
