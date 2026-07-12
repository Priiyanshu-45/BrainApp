import express from "express";
import shareRouter from "./routes/share.routes.js";
import contentRouter from "./routes/content.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/content", contentRouter);
app.use("/api", shareRouter);

export default app;