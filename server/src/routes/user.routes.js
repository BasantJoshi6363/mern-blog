import express from "express";
import { loginUser, registerUser } from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter.post("/api/auth/v1/register",registerUser)
userRouter.post("/api/auth/v1/login",loginUser)

export default userRouter;
