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
        let liked = ""
        // Check if user already liked this post
        const alreadyLiked = await Like.findOne({ post: id, user: userId });
        console.log(alreadyLiked);
        if (alreadyLiked) {
            await Like.findByIdAndDelete(alreadyLiked._id);
            await Post.findByIdAndUpdate(id, {
                $pull: {
                    like: alreadyLiked._id
                }
            })

            return res.status(200).json({
                success: true,
                message: "dislike successful",
                liked: false
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
            liked: true
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}