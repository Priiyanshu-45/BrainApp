import { connect } from "mongoose";
import app from "./app.js";
import dotenv from "dotenv";
import { string } from "zod";

dotenv.config();

const PORT = process.env.PORT;
const url = process.env.MONGODB_URL?.toString();

console.log("Inside server.");


await connect(url as string)
  .then(() => {
    console.log("Connected to DB.");
    app.listen(PORT, () => {
      console.log("Yeah Listening to PORT 3000");
    });
  })
  .catch((err) => console.log(err));
