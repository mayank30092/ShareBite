import express from "express";
import { createEvent, getAllEvents, getEventById, deleteEvent } from "../controllers/eventController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createEvent);
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.delete("/:id", verifyToken, deleteEvent);

export default router;
