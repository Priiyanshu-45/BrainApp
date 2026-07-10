import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../db/db.js";
import { z } from "zod";

const saltRounds = 10;
const JWT_SECTRET = "abc123";

const authSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(12, { message: "Username cannot exceed 12 characters." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(16, { message: "Password cannot exceed 16 characters." })
    .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*)(\-_/.,';:|])/, {
      message:
        "Must containt at least one UpperCase, LowerCase, digit and a special character and of minimum length 8. ",
    }),
});

async function signup(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    let result = authSchema.safeParse({ username, password });
    if (!result.success) {
      console.log("failed while parsing");
      return res.status(400).json({ message: `${result.error}` });
    }
    const data = result.data;
    const is_exist = await User.findOne({ username: data.username });
    if (is_exist)
      return res.status(403).json({ message: "User Already Exist" });
    const hashPass = await bcrypt.hash(data.password, saltRounds);
    await User.create({
      username: data.username,
      password: hashPass,
    });
    console.log("Created Account" + data.username);
    res.status(200).json({ message: "Successfully Created Account." });
  } catch (err) {
    if (err instanceof Error)
      return res
        .status(500)
        .json({ message: `Internal Server Error \n ${err.message}` });
  }
}

async function login(req: Request, res: Response) {
  try {
    const { username, password, rememberMe } = req.body;
    let result = authSchema.safeParse({ username, password });
    if (!result.success) {
      console.log("failed while login parsing");
      return res
        .status(403)
        .json({ message: `Wrong Email/Password \n ${result.error}` });
    }
    const data = result.data;
    const findUser = await User.findOne({ username: data.username });
    if (!findUser)
      return res.status(403).json({ message: "User Does not exist." });
    const is_Matched = await bcrypt.compare(data.password, findUser.password);
    if (!is_Matched)
      return res.status(403).json({
        message: "Invalid username or password",
      });
    console.log("User Found " + findUser.username);
    const expiry = rememberMe ? "7d" : "1d";
    const token = jwt.sign({ id: findUser._id }, JWT_SECTRET, {
      expiresIn: expiry,
    });
    res.status(200).json({ token, message: "Logged In Successfully." });
  } catch (err) {
    if (err instanceof Error)
      return res
        .status(500)
        .json({ message: `Error Occurred \n ${err.message}` });
  }
}

export { signup, login };
