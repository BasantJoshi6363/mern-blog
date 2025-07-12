import { Comment } from "../model/comment.model.js";
export const createComment = async (req, res) => {
  try {
    const { text } = req.body;
    const result = await Comment.create({ text, user: req.user.id,post : req.params.id });
    return res.status(201).json({
      success: true,
      message: "comment created!!!",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllComment = async (req, res) => {
  try {
    console.log("getting all comment")
    const postId = req.params.id
    const comment = await Comment.find({post: postId}).populate("user","username email");``
    console.log(comment)

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "unable to fetch comment!!!",
     
    });
  }
};
