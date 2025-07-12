import { populate } from "dotenv";
import { Comment } from "../model/comment.model.js";
import { Post } from "../model/post.model.js";
import cloudinary from "../utils/cloudinary.js";
import { model } from "mongoose";

export const createPost = async (req, res) => {
  try {
    const { title, content,category } = req.body;
    if (!req.file) {
      return res.status(500).json({
        success: false,
        message: "No file Uploaded.",
      });
    }
    const imageUrl = req?.file.path;
    const result = await cloudinary.uploader.upload(imageUrl);

    const created = await Post.create({
      title: title,
      content: content,
      imageUrl: result.secure_url,
      category,
      user: req.user.id,
    });
    return res.status(201).json({
      success: true,
      message: "Post Created Successful.!!",
      created,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// export const getAllPost = async (req, res) => {
//   try {
//     const posts = await Post.find()
//       .populate("user", "username email")
//       .populate({
//         path: "comment",
//         populate: {
//           path: "user", // not "comment"
//           select: "text username email",
//         },
//       })
//       .sort({ createdAt: -1 });

//     return res.status(200).json({
//       success: true,
//       message: "post fetched successfully.",
//       posts,
//     });
//   } catch (error) {}
// };

export const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "username").lean().limit(10);
    const commentWithPost = [];

    for (const post of posts) {
      const comment = await Comment.find({ post: post._id })
        .populate("user", "text,username,email")
        .lean();
      commentWithPost.push({...post,
  comment});
    }

    res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      posts: commentWithPost,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getSinglePost = async(req,res)=>{
  try {
    const id = req.params.id;
    console.log("first")
    const result = await Post.findById(id).populate("user","username")
    .populate({
      path : "comment",
      populate:{
        path : "user, text, username",
        model : "User"
      }
    })

    return res.json({
      message : "single post fetch",
      result
    })
    
  } catch (error) {
    return res.status(500).json({
      success : false,
      message : error.message
    })
  }
}