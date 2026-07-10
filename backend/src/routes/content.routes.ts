import express from "express";
import {
  allcontent,
  updateContent,
  addContent,
  deleteContent,
} from "../controller/content.js";
import authMiddleware from "../middlewares/auth.middleware.js"

const contentRouter = express.Router();

contentRouter.use(authMiddleware);

contentRouter.get("/mybrain", allcontent);

contentRouter.put("/updateContent/:id", updateContent);

contentRouter.post("/addContent", addContent);

contentRouter.delete("/deleteContent/:id", deleteContent);

export default contentRouter;
