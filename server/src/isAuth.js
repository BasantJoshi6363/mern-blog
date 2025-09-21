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


export const checkAuthor = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const data = await jwt.decode(token, "thisissecret");
    const user = await User.findOne(data._id);

    if (user.role === "author") {
      res.status(202).json({
        success: true
      })
      next();
    }
  next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
}




