import Event from "../models/Events.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const createEvent = async (req, res) => {
  const {
    title,
    description,
    userId,
    startTime,
    address,
    photos,
    category,
    eventDate,
  } = req.body;

  try {
    const event = await Event.create({
      title,
      description,
      userId,
      startTime,
      address,
      photos,
      category,
      eventDate,
    });
    res.status(200).json(event);
  } catch (error) {
    console.error("Error in create event:", error);
    return res.status(500).json({ message: error.message || "Server Error" });
  }
};
