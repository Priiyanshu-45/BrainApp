import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { User } from "../db/db.js";
import type { Types } from "mongoose";

const JWT_SECRET = "abc123";

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeaders = req.headers.authorization;
    if (!authHeaders)
      return res.status(400).json({ message: "Missing authorization Header." });
    const authToken = authHeaders.split(" ");
    if (authToken.length !== 2 || authToken[0] !== "Bearer")
      return res
        .status(400)
        .json({ message: "Incorrect authorization Header." });
    const token = authToken[1];
    if (!token) return res.status(400).json({ message: "Missing token." });
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === "string" || !("id" in decoded))
      return res.status(401).json({ message: "Invalid token." });
    const userId = (decoded as JwtPayload & { id: Types.ObjectId }).id;
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User does not found." });
    req.user.id = userId;
    next();
  } catch (err) { 
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        message: "Token expired",
      });
    }

    if (err instanceof Error) {
      return res
        .status(500)
        .json({ message: `Error Occurred. \n ${err.message}` });
    }
  }
}

export default authMiddleware;
