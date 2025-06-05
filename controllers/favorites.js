import Item from "../models/Items.js";
import User from "../models/User.js";
import ErrorResponse from "../utils/ErrorResponse.js";

// Add item to user favorites
export const addFavorite = async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    
    const user = await User.findById(userId);
    if (!user) throw new ErrorResponse("User not found", 404);
    
    const item = await Item.findById(itemId);
    if (!item) throw new ErrorResponse("Item not found", 404);
    
    if (!user.favorites.includes(itemId)) {
      user.favorites.push(itemId);
      await user.save();
    }
    
    res.status(200).json({ message: "Item added to favorites", favorites: user.favorites });
  } catch (error) {
    console.error("Error in addFavorite:", error);
    return res.status(error.status || 500).json({ message: error.message || "Server Error" });
  }
};

// Remove item from user favorites
export const removeFavorite = async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    
    const user = await User.findById(userId);
    if (!user) throw new ErrorResponse("User not found", 404);
    
    user.favorites = user.favorites.filter(id => id.toString() !== itemId);
    await user.save();
    
    res.status(200).json({ message: "Item removed from favorites", favorites: user.favorites });
  } catch (error) {
    console.error("Error in removeFavorite:", error);
    return res.status(error.status || 500).json({ message: error.message || "Server Error" });
  }
};

// Get user's favorite items
export const getFavorites = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findById(userId).populate('favorites');
    if (!user) throw new ErrorResponse("User not found", 404);
    
    res.status(200).json(user.favorites);
  } catch (error) {
    console.error("Error in getFavorites:", error);
    return res.status(error.status || 500).json({ message: error.message || "Server Error" });
  }
};