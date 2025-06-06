import Item from "../models/Items.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const createItem = async (req, res) => {
  console.log("called Create Item");
  console.log("reqbody", req.body);
  const {
    postType,
    title,
    description,
    userId,
    category,
    photos,
    address,
    collectionTime,
  } = req.body;

  try {
    const checkItem = await Item.find({ title });
    if (checkItem.length)
      throw new ErrorResponse("Item with such name already exists", 409);

    let coords = address?.location?.coordinates;
    if (!Array.isArray(coords) || coords.length !== 2) {
      throw new ErrorResponse("Invalid or missing coordinates", 400);
    }

    const item = await Item.create({
      postType,
      title,
      description,
      userId,
      category,
      photos,
      address: {
        ...address,
        location: {
          type: "Point",
          coordinates: coords,
        },
      },
      collectionTime,
    });
    res.status(200).json(item);
  } catch (error) {
    console.error("Error in createItem:", error);
    return res.status(500).json({ message: error.message || "Server Error" });
  }
};

export const getAllItems = async (req, res) => {
  try {
    const { category, postType = "Offer" } = req.query; // Default to 'Offer'
    const query = { postType }; // Always filter by postType

    if (category && typeof category === "string") {
      const categoriesArray = category.split(",");
      query.category = { $in: categoriesArray };
    }

    const items = await Item.find(query);
    res.status(200).json(items);
  } catch (error) {
    throw new ErrorResponse("Failed to fetch items", 500);
  }
};

// GET ITEM BY ID
export const getItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    next(new ErrorResponse("Something went wrong", 400));
  }
};

export const deleteItem = async (req, res) => {
  console.log(req.params.id);

  try {
    const findItem = await Item.findById({ _id: req.params.id });
    if (!findItem)
      return res.status(404).json({ message: "Could not find item" });
    console.log(findItem);

    const deletedItem = await Item.findOneAndDelete({ _id: req.params.id });
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
    postType,
    photos,
    address,
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
        postType,
        photos,
        collectionTime,
      }
    );
    res.status(200).json(updatedItem);
  } catch (error) {
    throw new ErrorResponse(`Something went wrong: ${error.message} `, 400);
  }
};

export const getUserItem = async (req, res) => {
  // console.log(req.body);

  try {
    const items = await Item.find({ _id: { $in: req.body } });
    if (!items) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(items);
  } catch (error) {
    console.error("Error in create message:", error);
    return res.status(500).json({ message: error.message || "Server Error" });
  }
};

export const getUserAllItem = async (req, res) => {
  const { _id } = req.body;
  console.log(_id);

  try {
    const items = await Item.find({ userId: _id });
    if (!items) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(items);
  } catch (error) {
    console.error("Error in create message:", error);
    return res.status(500).json({ message: error.message || "Server Error" });
  }
};
