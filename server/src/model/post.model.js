import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },

    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    comment: [
      {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Comment"
      }
    ],
    like:[
      {
         type : mongoose.Schema.Types.ObjectId,
        ref : "Comment"
      }
    ]
  },
  { timestamps: true }
);

export const Post = new mongoose.model("Post", postSchema);
