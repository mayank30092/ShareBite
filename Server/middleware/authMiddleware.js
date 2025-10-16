import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

export const verifyAdminOrNGO = (req, res, next) => {
  if (req.user.role === "ngo" || req.user.role === "admin") next();
  else res.status(403).json({ message: "Access denied" });
};
