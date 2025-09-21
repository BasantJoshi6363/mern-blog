// controllers/comment.controller.js
import { Comment } from "../models/comment.model.js";
import Post from "../models/post.model.js";

export const createComment = async (req, res) => {
    try {
        // console.log(req.params)
        const { content } = req.body;
        // console.log(content)

        if (!content) {
            return res.status(400).json({
                success: false,
                message: "Content is required.",
            });
        }

        const comment = await Comment.create({
            content,
            user: req.user._id,
            post: req.params.id

        });

        await Post.findByIdAndUpdate(req.params.id, {
            $push: {
                comment: comment._id
            }
        }, { new: true })

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
