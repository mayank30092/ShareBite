import Food from "../models/Food.js";

// Add Food
export const addFood = async (req, res) => {
  try {
    const food = new Food({ ...req.body, createdBy: req.user.id });
    await food.save();
    res.status(201).json({ message: "Food item added successfully", food });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all available foods
export const getFoods = async (req, res) => {
  try {
    const food = await Food.find({ status: "available" }).populate("createdBy", "name email");
    res.status(200).json(food);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Claim Food
export const claimFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: "Food not found" });

    food.status = "claimed";
    await food.save();

    res.status(200).json({ message: "Food claimed successfully", food });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Food by ID
export const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id).populate("createdBy", "name email location");
    if (!food) return res.status(404).json({ message: "Food not found" });
    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Food
export const deleteFood = async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Food item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update Food
export const updateFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: "Food not found" });

    // Only creator can update
    if (food.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this food" });
    }

    const { name, description, quantity, type, expiryDate, pickupLocation, status } = req.body;

    food.name = name || food.name;
    food.description = description || food.description;
    food.quantity = quantity !== undefined ? quantity : food.quantity;
    food.type = type || food.type;
    food.expiryDate = expiryDate || food.expiryDate;
    food.pickupLocation = pickupLocation || food.pickupLocation;
    food.status = status || food.status;

    await food.save();
    res.status(200).json({ message: "Food updated successfully", food });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//donated foods
export const getMyFoods = async(req,res) =>{
  try{
    const foods = await Food.find({ createdBy : req.user.id});
    res.status(200).json(foods);
  }catch(error){
    res.status(500).json({mesaage:error.message});
  }
}