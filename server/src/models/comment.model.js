import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        trim: true,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }
}, {
    timestamps: true
})

export const Comment = new mongoose.model("Comment", commentSchema);