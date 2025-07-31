import express from "express";
import mongoose from "mongoose";
import postRouter from "./src/routes/post.route.js";
import commentRouter from "./src/routes/comment.route.js";
import userRouter from "./src/routes/user.route.js";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors"
import likeRouter from "./src/routes/like.route.js";
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", postRouter);
app.use("/api", commentRouter);
app.use("/api", userRouter);
app.use("/api", likeRouter);

async function connect() {
  try {
    await mongoose.connect(
      "mongodb://127.0.0.1:27017/blog");
    console.log("database connectionsuccesful!!");
  } catch (error) {
    console.log(error);
  }
}
app.listen(5000, () => {
  connect();
  console.log("server listening at port 5000");
});
