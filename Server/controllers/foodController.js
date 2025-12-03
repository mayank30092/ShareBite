import Food from "../models/Food.js";
import axios from "axios";

// Helper: Geocode address → lat/lng
async function getCoordinates(address) {
  try {
    const res = await axios.get("https://nominatim.openstreetmap.org/search", {
      params: {
        q: address,
        format: "json",
        limit: 1,
      },
      headers: {
        "User-Agent": "FoodDonationApp/1.0",
      },
    });

    if (res.data.length === 0) return null;

    return {
      latitude: parseFloat(res.data[0].lat),
      longitude: parseFloat(res.data[0].lon),
    };
  } catch (err) {
    console.error("Geocoding error:", err);
    return null;
  }
}

// ADD FOOD
export const addFood = async (req, res) => {
  try {
    const { pickupLocation } = req.body;

    // 🔥 Convert address → lat/lng
    const coords = await getCoordinates(pickupLocation);

    if (!coords) {
      return res.status(400).json({
        message: "Unable to find coordinates for pickup location",
      });
    }

    const food = new Food({
      ...req.body,
      createdBy: req.user.id,
      latitude: coords.latitude,
      longitude: coords.longitude,
      location: {
        type: "Point",
        coordinates: [coords.longitude, coords.latitude], // GeoJSON: [lng, lat]
      },
    });

    await food.save();
    res.status(201).json({ message: "Food item added successfully", food });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET AVAILABLE FOODS
export const getFoods = async (req, res) => {
  try {
    const food = await Food.find({ status: "available" })
      .populate("createdBy", "name email");
    res.status(200).json(food);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CLAIM FOOD
export const claimFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: "Food not found" });

    food.status = "claimed";
    food.claimedBy = req.user.id;
    await food.save();

    res.status(200).json({ message: "Food claimed successfully", food });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET FOOD BY ID
export const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id)
      .populate("createdBy", "name email");

    if (!food) return res.status(404).json({ message: "Food not found" });

    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE FOOD
export const deleteFood = async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Food item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// UPDATE FOOD (WITH RE-GEOCODING)
export const updateFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: "Food not found" });

    // Only owner can update
    if (food.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { pickupLocation } = req.body;

    // If pickup location changed → update coordinates
    if (pickupLocation && pickupLocation !== food.pickupLocation) {
      const coords = await getCoordinates(pickupLocation);
      if (coords) {
        food.latitude = coords.latitude;
        food.longitude = coords.longitude;
        food.location = {
          type: "Point",
          coordinates: [coords.longitude, coords.latitude],
        };
      }
    }

    // Update fields normally
    Object.assign(food, req.body);

    await food.save();
    res.status(200).json({ message: "Food updated successfully", food });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET MY DONATED FOODS
export const getMyFoods = async (req, res) => {
  try {
    const foods = await Food.find({ createdBy: req.user.id });
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Feedback & rating
export const submitFeedback = async (req, res) => {
  const { rating, feedback } = req.body;
  const foodId = req.params.id;
  const userId = req.user?.id;

  console.log("Submitting feedback:", { foodId, userId, rating, feedback });

  try {
    const food = await Food.findById(foodId);

    if (!food) return res.status(404).json({ message: "Food not found" });

    console.log("food.claimedBy:", food.claimedBy);

    if (!food.claimedBy || food.claimedBy.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to rate" });
    }

    const updatedFood = await Food.findByIdAndUpdate(
      foodId,
      { rating: Number(rating), feedback: feedback || "" },
      { new: true, runValidators: true } // runValidators ensures rating/feedback match schema
    );

    res.status(200).json({ message: "Feedback submitted", food: updatedFood });
  } catch (err) {
    console.error("Feedback error:", err.message, err.stack);
    res.status(500).json({ message: "Server error" });
  }
};


