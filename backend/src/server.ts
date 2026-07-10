import { connect } from "mongoose";
import app from "./app.js";

const PORT = 3000;

app.listen(PORT, () => {
    console.log("Yeah Listening to PORT 3000");
});