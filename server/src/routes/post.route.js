import express from "express"
import { createPost, deletePost, getAllPostAfterLogin, getPost, getsinglePost, getUserPost, updatePost, verifyIsAuthor } from "../controllers/post.controller.js";
import upload from "../utils/multer.js";
const postRouter = express.Router();
import { checkAuthor, isAuthenticated } from "../isAuth.js";

postRouter.post("/v1/create", isAuthenticated,checkAuthor, upload.single("file"), createPost)
postRouter.get("/posts", getPost)
postRouter.get("/post/:id", getsinglePost)
postRouter.get("/poste/:id", verifyIsAuthor)
postRouter.get("/user/:id", isAuthenticated, getUserPost);
postRouter.put("/v1/post/edit/:id", isAuthenticated, upload.single("file"), updatePost);
postRouter.get("/afterlogin", isAuthenticated, checkAuthor, getAllPostAfterLogin);
postRouter.delete("/delete/:id",isAuthenticated,checkAuthor,deletePost);



export default postRouter;