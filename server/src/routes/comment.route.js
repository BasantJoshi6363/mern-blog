// routes/comment.routes.js
import express from "express";
import { createComment } from "../controllers/comment.controller.js";
import { isAuthenticated } from "../isAuth.js";

const commentRouter = express.Router();

// Create a comment (requires login)
commentRouter.post("/comment/:id", isAuthenticated, createComment);

export default commentRouter;
