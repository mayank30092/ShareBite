import express from "express";
import { claimFood, getMyClaims, getAllClaims,getClaimById } from "../controllers/claimController.js";
import { verifyToken, verifyAdminOrNGO } from "../middleware/authMiddleware.js";

const router = express.Router();

// Normal user claims food
router.post("/", verifyToken, claimFood);

// View own claims
router.get("/my-claims", verifyToken, getMyClaims);

// Admin / NGO view all claims
router.get("/", verifyToken, verifyAdminOrNGO, getAllClaims);

router.get("/:id",verifyToken,getClaimById);
export default router;
