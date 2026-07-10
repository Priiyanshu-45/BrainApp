import express from "express";
import { receive, share } from "../controller/shareableContent.js";

const shareRouter = express.Router();

shareRouter.get("/shareMybrain", share);

shareRouter.get("/receive/:id", receive);

export default shareRouter;