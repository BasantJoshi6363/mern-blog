import Post from "../models/post.model.js"
import fs from "fs"
import cloudinary from "../utils/cloudinary.js"
import jwt from "jsonwebtoken"
import { User } from "../models/users.model.js"
export const createPost = async (req, res) => {
    try {
        const { title, body, category } = req.body
        // const userInfo = req.user;
        // console.log(userInfo)
        // const user = await User.findOneAndUpdate({ role: "author" }, { new: true });
        // console.log(user)
        const result = await cloudinary.v2.uploader.upload(req.file.path)
        if (!result) {
            return res.status(500).json({
                success: false,
                message: "problem on uploading file on cloudinary"
            })
        }

        const image = result?.secure_url

        fs.unlinkSync(req.file.path);
        console.log("check check")
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
        else {

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

export const verifyIsAuthor = async (req, res) => {
    try {
        let token = req.headers.authorization;
        let author;
        const user = await jwt.verify(token, "thisissecret");

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getUserPost = async (req, res) => {
    try {
        const userId = req.user.id;
        // console.log(await Post.find({ user:userId }))

        const user = await Post.find({ user: userId })
            .populate("user")
            .populate({
                path: "like",
                populate: {
                    path: "user",
                    select: "_id username email"
                }
            })
            .populate({
                path: "comment",
                populate: {
                    path: "user",
                    select: "_id username email"
                }

            })
            .sort({ createdAt: -1 }).exec();


        return res.status(200).json({
            sucess: true,
            message: "user post fetched successfully",
            result: user
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const updatePost = async (req, res) => {
    try {

        const { id } = req.params;
        const { title, body, category } = req.body;

        let updatedFields = { title, body, category };
        if (req.file) {
            const result = await cloudinary.v2.uploader.upload(req.file.path);
            if (!result) {
                return res.status(500).json({
                    success: false,
                    message: "problem on uploading file on cloudinary"
                })
            }
            const image = result?.secure_url;
            fs.unlinkSync(req.file.path);
            updatedFields.imageUrl = image;
        }
        // const post = await Post.findById(id);
        // if (!post) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "Post not found"
        //     });
        // }
        // if (post.user.toString() !== req.user._id.toString()) {
        //     return res.status(403).json({
        //         success: false,
        //         message: "You are not authorized to update this post"
        //     });
        // }
        const updatedPost = await Post.findByIdAndUpdate(id, updatedFields, { new: true });
        return res.status(200).json({
            success: true,
            message: "Post updated successfully",
            updatedPost
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }
        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this post"
            });
        }
        await Post.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: "Post deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getAllPostAfterLogin = async (req, res) => {
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
        return res.status(200).json({
            success: true,
            message: "Post fetched successfully",
            result,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}