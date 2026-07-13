import express from "express";
import { share, receive } from "../controller/shareableContent.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const shareRouter = express.Router();

shareRouter.use(authMiddleware);

shareRouter.post("/shareMybrain", share);

shareRouter.get("/shareMybrain/:hash", receive);


export default shareRouter;