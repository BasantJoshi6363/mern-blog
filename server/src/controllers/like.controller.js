import Post from "../models/post.model.js";
import Like from "../models/like.model.js";
export const likePost = async (req, res) => {
    try {
        const { id } = req.params; // post ID
        const userId = req.user;   // assume this is set by auth middleware

        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        // Check if user already liked this post
        const alreadyLiked = await Like.findOne({ post: id, user: userId });
        if (alreadyLiked) {
            return res.status(400).json({
                success: false,
                message: "User has already liked the post.",
            });
        }

        // Create like document
        const createLike = await Like.create({ post: id, user: userId });

        // Add like reference to Post
        await Post.findByIdAndUpdate(id, {
            $addToSet: {
                like: createLike._id,
            },
        });

        return res.status(201).json({
            success: true,
            message: "Like created successfully",
            like: createLike,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}