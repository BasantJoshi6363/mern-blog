import express from "express";
import connect from "./src/utils/config.js";
import postRouter from "./src/routes/post.route.js";
import userRouter from "./src/routes/user.routes.js";
import commentRoute from "./src/routes/comment.route.js";
import cors from "cors"
import { validateToken } from "./src/utils/validate.js";
import dotenv from "dotenv"
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
process.loadEnvFile()
app.use("/", postRouter);
app.use("/", userRouter);
app.use("/", commentRoute);
app.post("/validatetoken", validateToken);
// console.log(process.env.CLOUD_NAME);

app.listen(5000, () => {
  connect();
  console.log("connection successful");
});
