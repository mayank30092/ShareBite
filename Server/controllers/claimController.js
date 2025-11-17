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
    food.claimedBy = req.user.id;
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

export const giveUpFood = async(req,res) =>{
  try{
    const {claimId} = req.params;
    const claim = await Claim.findById(claimId).populate("food");

    if(!claim) return res.status(404).json({message:"Claim not found"});
    if(claim.claimedBy.toString()!==req.user.id)
      return res.status(403).json({message:"Not authorized"});

    const food = claim.food;
    food.status = "available";
    food.claimedBy = null;
    await food.save();

    await claim.remove();

    res.status(200).json({messgae: "Food is available again"});
  }catch(err){
    res.status(500).json({message: err.message});
  }
}

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
