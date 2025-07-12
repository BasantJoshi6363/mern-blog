import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      trim : true
    },
    user: [{
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    }],
  },
  {
    timestamps: true,
  }
);

export const Comment = new mongoose.model("Comment", commentSchema);
