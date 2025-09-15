import jwt from "jsonwebtoken";
import { User } from "./models/users.model.js";
export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access Denied. No token provided.",
      });
    }

    const decoded = await jwt.verify(token, "thisissecret");

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};




