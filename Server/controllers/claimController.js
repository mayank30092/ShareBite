import Claim from "../models/Claim.js";
import Food from "../models/Food.js";

/**
 * Create a claim for a food item
 */
export const claimFood = async (req, res) => {
  try {
    const { foodId } = req.body;

    const food = await Food.findById(foodId);
    if (!food) return res.status(404).json({ message: "Food not found" });
    if (food.status !== "available")
      return res.status(400).json({ message: "Food not available for claiming" });

    const claim = new Claim({
      food: foodId,
      claimedBy: req.user.id,
    });

    await claim.save();

    food.status = "claimed";
    await food.save();

    res.status(201).json({ message: "Food claimed successfully", claim });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Get all claims made by the logged-in user
 */
export const getMyClaims = async (req, res) => {
  try {
    const claims = await Claim.find({ claimedBy: req.user.id })
      .populate("food", "name quantity type")
      .populate("claimedBy", "name email");
    res.status(200).json(claims);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Admin / NGO – View all claims
 */
export const getAllClaims = async (req, res) => {
  try {
    const claims = await Claim.find()
      .populate("food", "name status")
      .populate("claimedBy", "name email");
    res.status(200).json(claims);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
