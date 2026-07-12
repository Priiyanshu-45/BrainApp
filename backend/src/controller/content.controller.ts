import type { Request, Response } from "express";
import { z } from "zod";
import { Types } from "mongoose";
import { Content, contentType, Tag } from "../db/db.js";

async function getTagObjectIds(tags: string[], tagIds: Types.ObjectId[]) {
  for (let tag of tags) {
    const findTag = await Tag.findOne({ name: tag });
    if (!findTag) {
      const newTag = await Tag.create({ name: tag });
      tagIds.push(newTag._id);
    } else tagIds.push(findTag._id);
  }
}

const ContentSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, { message: "Title must be at least of 3 Characters." })
    .max(50, { message: "Title can be at max of 50 characters." }),
  type: z.enum(contentType),
  description: z.string().trim().optional(),
  link: z.string().trim().optional(),
  tags: z.array(z.string().toLowerCase().trim()).optional(),
});

async function addContent(req: Request, res: Response) {
  try {
    const userId = req.user.id;
    const content = req.body.content;
    let result = ContentSchema.safeParse(content);
    if (!result.success)
      return res
        .status(400)
        .json({ message: `${result.error.issues[0]?.message}` });
    const data = result.data;
    const tagIds: Types.ObjectId[] = [];
    if (data.tags) {
      await getTagObjectIds(data.tags, tagIds);
    }
    let usefulContent = {
      title: data.title,
      type: data.type,
      creator: userId,
      tags: tagIds,
      ...(data.link && { link: data.link }),
      ...(data.description && { description: data.description }),
    };
    const addedContent = await Content.create(usefulContent);
    res.status(201).json({
      title: addedContent.title,
      type: addedContent.type,
      description: addedContent.description,
      link: addedContent.link,
      tags: addedContent.tags,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error." });
  }
}

async function allcontent(req: Request, res: Response) {
  try {
    const userId = req.user.id;
    const allNotes = await Content.find({ creator: userId }).select([
      "title",
      "type",
      "description",
      "link",
      "tags",
      "-_id"
    ]);
    res.status(200).send(allNotes);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Errorr." });
  }
}

async function updateContent(req: Request, res: Response) {
  try {
    const contentId = req.params.id;
    const userId = req.user.id;
    const content = req.body.content;
    const result = ContentSchema.partial().safeParse(content);
    if (!result.success)
      return res
        .status(400)
        .json({ message: ` ${result.error.issues[0]?.message}` });
    const data = result.data;
    const tagIds: Types.ObjectId[] = [];
    if (data.tags) {
      await getTagObjectIds(data.tags, tagIds);
    }
    let usefulContent = {
      ...(data.title && { title: data.title }),
      ...(data.type && { type: data.type }),
      ...(data.tags && { tags: tagIds }),
      ...(data.link && { link: data.link }),
      ...(data.description && { description: data.description }),
    };
    const updatedContent = await Content.findOneAndUpdate(
      { _id: contentId, creator: userId },
      {
        $set: usefulContent,
      },
      {
        new: true,
        runValidators: true,
      },
    ).select(['-creator', '-timestamps', '-__v', '-_id']);
    res.status(200).json(updatedContent);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Errorr." });
  }
}

async function deleteContent(req: Request, res: Response) {
  try {
    const contentId = req.params.id;
    const userId = req.user.id;
    const result = await Content.deleteOne({ _id: contentId, creator: userId });
    if (result.deletedCount === 0)
      return res.status(404).json({ message: "Content don't exist." });
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error." });
  }
}

export { allcontent, updateContent, addContent, deleteContent };
