import express from "express"
import authenticate from "../utils/authenticate.js"
import { createComment, getAllComment } from "../controller/comment.controller.js";

const commentRoute = express.Router();
commentRoute.post("/post/:id",authenticate,createComment)
commentRoute.get("/post/:id",getAllComment)


export default commentRoute;