import Post from "../models/post.model.js";
import Like from "../models/like.model.js";
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user;
      

        const createLike = await Like.create({ post: id, user: userId });


        await Post.findByIdAndUpdate(id, {
            $addToSet: {
                like: createLike._id
            }
        }, { new: true })


        return res.status(201).json({
            message: "like creation successfull",
            success: true,
            createLike
        })


    } catch (error) {
        return res.status(500).json({
            success: true,
            message: error.message
        })
    }
}