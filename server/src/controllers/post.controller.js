import Post from "../models/post.model.js"
import fs from "fs"
import cloudinary from "../utils/cloudinary.js"
import { create } from "domain"

export const createPost = async (req, res) => {
    try {
        const { title, body, category } = req.body


        const result = await cloudinary.v2.uploader.upload(req.file.path)
        if (!result) {
            return res.status(500).json({
                success: false,
                message: "problem on uploading file on cloudinary"
            })
        }

        const image = result?.secure_url

        fs.unlinkSync(req.file.path);
        const final = await Post.create({
            title, body, category,
            imageUrl: image,
            user: req.user._id

        })
        return res.status(201).json({
            success: true,
            message: "post creation successful!",
            final
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getPost = async (req, res) => {
    try {
        const result = await Post.find()
        .populate("user")
        .populate({
            path: "like",
            populate: {
                path: "user",
                select: "_id username email"
            }
        }).populate({
            path: "comment",
            populate: {
                path: "user",
                select: "_id username email"
            }

        }).sort({ createdAt: -1 }).exec();
        return res.status(201).json({
            success: true,
            message: "Post fetched successfully",
            result,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getsinglePost = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Post.findById(id)
            .populate("user")
            .populate({
                path: "like",
                populate: {
                    path: "user",
                    select: "_id username email",
                }
            })
            .populate({
                path: "comment",
                populate: {
                    path: "user",
                    select: "_id username email"
                }
            }).exec();
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Post fetched successfully",
            result
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}