import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../db/db.js";
import { z } from "zod";

const saltRounds = 10;
const JWT_SECTRET = process.env.JWT_SECRET;

const authSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(12, { message: "Username cannot exceed 12 characters." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(16, { message: "Password cannot exceed 16 characters." })
    .regex(/[A-Z]/, "Must contain Uppercase Character.")
    .regex(/[a-z]/, "Must contain Lowercase Character.")
    .regex(/[0-9]/, "Must contain a digit.")
    .regex(
      /[`~!@#$%^&*(){}<>,./;'":|+*=_-]/,
      "Must contain at least one Special-Character.",
    ),
});

async function signup(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    let result = authSchema.safeParse({ username, password });
    if (!result.success) {
      console.log("failed while parsing");
      return res.status(400).json({ message: `${result.error.issues[0]?.message}` });
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
    console.log("Created Account for " + data.username);
    res.status(200).json({ message: "Successfully Created Account." });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).send(z.treeifyError(err));
    }
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
        .json({ message: `Invalid Inputs. \n ${result.error}` });
    }
    const data = result.data;
    const findUser = await User.findOne({ username: data.username });
    if (!findUser)
      return res.status(403).json({ message: "User Does not exist." });
    const is_Matched = await bcrypt.compare(data.password, findUser.password);
    if (!is_Matched)
      return res.status(403).json({
        message: "Invalid Username or Password",
      });
    console.log("User Found " + findUser.username);
    const expiry = rememberMe ? "7d" : "1d";
    const token = jwt.sign({ id: findUser._id }, JWT_SECTRET as string, {
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

async function profile(req: Request, res: Response) {
  try {
    const userId = req.user.id;
    const user = await User.findById({ _id: userId }).select(['username', '-_id']);
    if (!user) return res.status(400).json({ message: "User Not found." });
    res.status(200).send(user);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error." });
  }
}

export { signup, login, profile };
