import Claim from "../models/Claim.js";
import Food from "../models/Food.js";


/**
 * NGO Claims a Food Item
 */
export const claimFood = async (req, res) => {
  try {
    const { foodId } = req.body;

    if (!foodId) {
      return res.status(400).json({ message: "foodId is required" });
    }

    const food = await Food.findById(foodId);
    if (!food) return res.status(404).json({ message: "Food not found" });

    if (food.status !== "available") {
      return res
        .status(400)
        .json({ message: "Food already claimed by someone else" });
    }

    // CREATE CLAIM ENTRY
    const claim = new Claim({
      food: foodId,
      claimedBy: req.user.id,
    });
    await claim.save();

    // UPDATE FOOD STATUS
    food.status = "claimed";
    food.claimedBy = req.user.id;
    await food.save();

    res.status(201).json({
      message: "Food claimed successfully",
      claim,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Get all claims of Logged-in NGO
 */
export const getMyClaims = async (req, res) => {
  try {
    const claims = await Claim.find({ claimedBy: req.user.id })
      .populate("food", "name quantity type status")
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

/**
 * NGO gives up a food → Food becomes available again
 */
export const giveUpFood = async (req, res) => {
  try {
    const { claimId } = req.params;

    const claim = await Claim.findById(claimId).populate("food");

    if (!claim) return res.status(404).json({ message: "Claim not found" });

    if (claim.claimedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // MAKE FOOD AVAILABLE AGAIN
    const food = claim.food;
    food.status = "available";
    food.claimedBy = null;
    await food.save();

    await claim.deleteOne();

    res.status(200).json({ message: "Food is now available again" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Get Single Claim Details → (Used for Claim Details Page)
 */
export const getClaimById = async (req, res) => {
  try {
    const { id } = req.params;

    const claim = await Claim.findById(id)
      .populate({
        path: "food",
        populate: {
          path: "createdBy",
          model: "User",
          select: "name email location",
        },
      })
      .populate("claimedBy", "name email")
      .populate("approvedBy", "name email");

    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }

    res.status(200).json(claim);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
