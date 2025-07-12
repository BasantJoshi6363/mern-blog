import express from "express";
import upload from "../utils/upload.js";
import authenticate from "../utils/authenticate.js";
import { createPost, getAllPost, getSinglePost } from "../controller/post.controller.js";
const postRouter = express.Router();

postRouter.post("/create", upload.single("file"), authenticate, createPost);
postRouter.get("/", getAllPost);
postRouter.get("/:id", getSinglePost);

export default postRouter;
