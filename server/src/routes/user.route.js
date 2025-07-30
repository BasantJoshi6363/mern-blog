// routes/user.routes.js
import express from "express";
import { createUser, loginUser, userInfoWithPost, validateToken } from "../controllers/user.controller.js";

const userRouter = express.Router();

// Register a new user
userRouter.post("/register", createUser);

// Login existing user
userRouter.post("/login", loginUser);
userRouter.get("/validate-token", validateToken);
userRouter.get("/userinfowithpost/:id",userInfoWithPost);

export default userRouter;
