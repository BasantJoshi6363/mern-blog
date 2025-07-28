// controllers/comment.controller.js
import { Comment } from "../models/comment.model.js";

export const createComment = async (req, res) => {
    try {
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({
                success: false,
                message: "Content is required.",
            });
        }

        const comment = await Comment.create({
            content,
            user: req.user._id, 
            post : req.params.id
            
        });

        return res.status(201).json({
            success: true,
            message: "Comment created successfully.",
            comment,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error while creating comment.",
        });
    }
};
