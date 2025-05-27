import Item from "../models/Items.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const createItem = async (req, res) => {
  console.log('called Create Item')
  console.log('reqbody',req.body)
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

    let coords = address?.location?.coordinates;
    if(!Array.isArray(coords) || coords.length !==2) {
      throw new ErrorResponse("Invalid or missing coordinates",400)
    }

    const item = await Item.create({
      title,
      description,
      userId,
      category,
      address: {
        ...address,
        location: {
          type: "Point",
          coordinates: coords,
        },
      },
      photos,
      collectionTime,
    });
    res.status(200).json(item);
  } catch (error) {
    console.error('Error in createItem:',error)
    return res.status(500).json({message: error.message || "Server Error"})
  }
};

export const getAllItems = async (req, res) => {
  try {
    const {category} = req.query;
    const query = category ? {category}:{};

    const items = await Item.find(query);

    res.status(200).json(items);
  } catch (error) {
    throw new ErrorResponse("Failed to fetch users", 500);
  }
};

;
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
