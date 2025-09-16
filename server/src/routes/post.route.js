import express from "express"
import { createPost, getPost, getsinglePost, getUserPost, updatePost, verifyIsAuthor } from "../controllers/post.controller.js";
import upload from "../utils/multer.js";
const postRouter = express.Router();
import { isAuthenticated } from "../isAuth.js";

postRouter.post("/v1/create", isAuthenticated, upload.single("file"), createPost)
postRouter.get("/posts", getPost)
postRouter.get("/post/:id", getsinglePost)
postRouter.get("/poste/:id", verifyIsAuthor)
postRouter.get("/user/:id", isAuthenticated, getUserPost);
postRouter.get("/post/edit/:id", isAuthenticated, upload.single("file"), updatePost);



export default postRouter;