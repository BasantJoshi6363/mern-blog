import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  profile: {
    type: String,
  },
  bio: {
    type: String,
    default: "This is my bio",
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }]

},{
  timestamps: true,
});

export const User = new mongoose.model("User", userSchema);
