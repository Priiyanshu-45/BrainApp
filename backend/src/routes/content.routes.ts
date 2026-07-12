import express from "express";
import {
  allcontent,
  updateContent,
  addContent,
  deleteContent,
} from "../controller/content.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js"

const contentRouter = express.Router();

contentRouter.use(authMiddleware);

contentRouter.get("/mybrain", allcontent);

contentRouter.patch("/update/:id", updateContent);

contentRouter.post("/add", addContent);

contentRouter.delete("/delete/:id", deleteContent);

export default contentRouter;
