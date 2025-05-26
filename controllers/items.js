import Item from "../models/Items.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const createItem = async (req, res) => {
  const {
    title,
    description,
    userId,
    category,
    address,
    photos,
    collectionTime,
  } = req.body;

  try {
    const checkItem = await Item.find({ title });
    if (checkItem.length)
      throw new ErrorResponse("Item with such name already exists", 409);

    const item = await Item.create({
      title,
      description,
      userId,
      category,
      address,
      photos,
      collectionTime,
    });
    res.status(200).json(item);
  } catch (error) {
    throw new ErrorResponse(error.message, 401);
  }
};

export const getAllItems = async (req, res) => {
  try {
    const {category} = req.query;

    const query = category ? {category}:{};
    const items = await Item.find(query);
    
    const allItems = await Item.find();
    res.status(200).json(allItems);
  } catch (error) {
    throw new ErrorResponse("Failed to fetch users", 500);
  }
};

export const getItem = async (req, res) => {
  const { title, description, userId, category } = req.body;

  try {
    const findItem = await Item.findOne({ title });

    if (!findItem)
      return res.status(404).json({ message: "Could not find item" });

    res.status(200).json(findItem);
  } catch (error) {
    throw new ErrorResponse("Something went wrong", 400);
  }
};

export const deleteItem = async (req, res) => {
  const { title, description, userId, category } = req.body;

  try {
    const findItem = await Item.findOne({ title });
    if (!findItem)
      return res.status(404).json({ message: "Could not find item" });
    const deletedItem = await Item.findOneAndDelete({ title });
    res.status(200).json(deletedItem);
  } catch (error) {
    throw new ErrorResponse("Something went wrong", 400);
  }
};

export const updateItem = async (req, res) => {
  const {
    title,
    description,
    userId,
    category,
    address,
    photos,
    collectionTime,
  } = req.body;

  try {
    const findItem = await Item.findOne({ title });
    if (!findItem) throw new ErrorResponse("Item not found", 404);
    const updatedItem = await Item.findOneAndUpdate(
      { title },
      {
        title,
        description,
        userId,
        category,
        photos,
        collectionTime,
      }
    );
    res.status(200).json(updatedItem);
  } catch (error) {
    throw new ErrorResponse(`Something went wrong: ${error.message} `, 400);
  }
};
