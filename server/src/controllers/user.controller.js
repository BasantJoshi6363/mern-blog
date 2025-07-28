import { User } from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

// Create User
export const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Empty field, please check.",
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User with this email already exists.",
            });
        }
        console.log(existingUser);

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await User.create({
            username,
            email,
            password: hashedPassword,
            role: "user"
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully.",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error while creating user.",
        });
    }
};

// Login User
export const loginUser = async (req, res) => {
    try {
        console.log(req.body)
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required.",
            });
        }

        const user = await User.findOne({ email });
        console.log(user)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found. Not registered",
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials.",
            });
        }
        const token = jwt.sign({ id: user._id }, "thisissecret", { expiresIn: '1d' });


        return res.status(200).json({
            success: true,
            message: "Login successful.",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            token: token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error while logging in.",
        });
    }
};


export const validateToken = async (req, res) => {
    try {

        const token = req.headers.authorization

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided.",
            });
        }

        const decoded = await jwt.verify(token, "thisissecret");
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        return res.status(200).json({
            success: true,
            username: user.username,
            email: user.email,
            userId: user._id
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Token validation failed.",
        });
    }
}


export const followUser = async(req,res)=>{
    try {
        const { userId } = req.body;
        const currentUserId = req.user.id; // Assuming you have middleware to set req.user

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required.",
            });
        }

        const userToFollow = await User.findById(userId);
        if (!userToFollow) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        // Add the user to the following list
        await User.findByIdAndUpdate(currentUserId, {
            $addToSet: { following: userId }
        });

        // Add the current user to the followers list of the followed user
        await User.findByIdAndUpdate(userId, {
            $addToSet: { followers: currentUserId }
        });

        return res.status(200).json({
            success: true,
            message: "User followed successfully.",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error while following user.",
        });
    }

}

