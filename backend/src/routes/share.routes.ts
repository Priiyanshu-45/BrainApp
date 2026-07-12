import express from "express";
import { share } from "../controller/shareableContent.js";

const shareRouter = express.Router();

shareRouter.get("/shareMybrain", share);


export default shareRouter;