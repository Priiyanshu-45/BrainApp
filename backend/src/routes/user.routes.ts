import express from "express";
import { signup, login, profile } from "../controller/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);

userRouter.post("/login", login);

userRouter.use(authMiddleware);

userRouter.get("/me", profile);

export default userRouter;