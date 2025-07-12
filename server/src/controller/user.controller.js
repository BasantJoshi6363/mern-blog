import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(500).json({
        success: false,
        message: "user already exist!",
      });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const finaluser = await User.create({
      username,
      email,
      password: hashpassword,
    });

    return res.status(201).json({
      success: true,
      message: "user creation successfully!!",
      username,
      email,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(500).json({
        success: false,
        message: "user not existed!!",
      });
    }
    const checkPass = await bcrypt.compare(password, user.password);
    if (!checkPass) {
      return res.status(500).json({
        success: false,
        message: "invalid user credentials",
      });
    }
    const secret = "thisissecret";
    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    const option = {
      expiresIn: "30d",
    };

    const token = await jwt.sign(payload, secret, option);

    return res.status(200).json({
      success: true,
      message: "user logged in",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
