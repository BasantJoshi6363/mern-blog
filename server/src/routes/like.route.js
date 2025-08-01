import express from "express"
import { isAuthenticated } from "../isAuth.js";
import { likePost } from "../controllers/like.controller.js";


const likeRouter = express();

likeRouter.post("/post/like/:id",isAuthenticated,likePost);

export default likeRouter;
