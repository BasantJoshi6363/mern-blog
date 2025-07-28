import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    body: {
        type: String,
        trim: true,
        required: true
    },
    category: {
        type: String,
        trim: true,
        required: true
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    imageUrl: {
        type: String,
        trim: true,
        required: true
    },
    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"

    }],
    like: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like"

    }]
}, {
    timestamps: true
})

const Post = mongoose.model("Post", postSchema);
export default Post;