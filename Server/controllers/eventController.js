import Event from "../models/Event.js"; // assume you already have Event model
import Food from "../models/Food.js";

/**
 * Create new event
 */
export const createEvent = async (req, res) => {
  try {
    const { title, description, date, time, venue } = req.body;

    const event = new Event({
      title,
      description,
      date,
      time,
      venue,
      createdBy: req.user.id,
    });

    await event.save();
    res.status(201).json({ message: "Event created successfully", event });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Get all upcoming events
 */
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy", "name email");
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Get event by ID
 */
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("createdBy", "name email");
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Delete event (admin or event creator)
 */
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await event.deleteOne();
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
