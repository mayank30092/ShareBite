import express from "express";
import { addFood, getFoods, getFoodById, updateFood, deleteFood, getMyFoods, submitFeedback,claimFood} from "../controllers/foodController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, authorizeRoles("restaurant"), addFood);
router.get("/", getFoods);
router.get("/my-foods",verifyToken,getMyFoods);
router.put("/:id/claim", verifyToken, authorizeRoles("ngo"), claimFood);
router.get("/:id", getFoodById);
router.put("/:id", verifyToken, updateFood);
router.delete("/:id", verifyToken, deleteFood);
router.put("/feedback/:id", verifyToken, submitFeedback);

export default router;
