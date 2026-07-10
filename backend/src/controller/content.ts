import type { Request, Response } from "express";
import { z } from "zod";
import { Types } from "mongoose";
import { Content, contentType, Tag } from "../db/db.js";

const ContentSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, { message: "Title must be at least of 3 Characters." })
    .max(50, { message: "Title can be at max of 50 characters." }),
  type: z.enum(contentType),
  description: z.string().trim().optional(),
  link: z.string().trim().optional(),
  tags: z.array(z.string().trim()).optional(),
});

async function addContent(req: Request, res: Response) {
  try {
    const userId = req.user.id;
    const content = req.body.content;
    let result = ContentSchema.safeParse(content);
    if (!result.success)
      return res.status(400).json({ message: "Invalid Content." });
    const data = result.data;
    const tagIds: Types.ObjectId[] = [];
    if (data.tags) {
      for (let tag of data.tags) {
        const findTag = await Tag.findOne({ name: tag });
        if (!findTag) {
          const newTag = await Tag.create({ name: tag });
          tagIds.push(newTag._id);
        } else tagIds.push(findTag._id);
      }
    }
    let usefulContent = ({
      title: data.title,
      type: data.type,
      creator: userId,
      tags: tagIds,
      ...(data.link && {link:data.link}),
      ...(data.description && {description: data.description})
    });
    await Content.create(usefulContent);
    res.status(200).json({message: "Succefully Created"});
  } catch (err) {
    return res.status(500).json({message: "Internal Server Error."});
  }
}

async function allcontent(req: Request, res: Response) {
  try {
    const userId = req.user.id;
  } catch (err) {}
}

async function updateContent(req: Request, res: Response) {
  try {
  } catch (err) {}
}

async function deleteContent(req: Request, res: Response) {
  try {
  } catch (err) {}
}

export { allcontent, updateContent, addContent, deleteContent };
