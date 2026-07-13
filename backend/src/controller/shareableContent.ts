import type { Request, Response } from "express";
import { Link, User, Content } from "../db/db.js";
import { random } from "../utils/random.js";
import {z} from "zod";


const is_shareSchema = z.object({
    is_share: z.boolean()
});

async function share(req: Request, res: Response) {
  try {
    const userId = req.user.id;
    const is_shareValue = req.body.is_share;
    const result = is_shareSchema.safeParse(is_shareValue);
    if(!result.success) {
      return res.status(400).json({message: ` ${result.error.issues[0]?.message}`})
    }
    const is_share = result.data;
    await User.findByIdAndUpdate(
        { _id: userId },
        {
          $set: {
            is_share: is_share,
          },
        },
        {
          runValidators: true,
        },
      );
    if (is_share) {
      let str: string;
      do {
      str = random(10);
      } while (await Link.exists({hash : str}));
      await Link.create({
        hash: str,
        creator: userId,
      });
      res.status(200).send(`/shareMybrain/${str}`);
    } else {
      await Link.findOneAndDelete({ creator: userId });
      res.status(200).json({ message: "Successfully stop sharing you brain." });
    }
  } catch (err) {
    if (err instanceof Error)
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: err });
  }
}

async function receive(req: Request, res: Response) {
  try {
    const hash = req.params.hash;
    if (hash === undefined || Array.isArray(hash)) {
      return res.status(400).json({ message: "Invalid query params." });
    }
    const senderId = await Link.findOne({ hash }).populate({
      path : "creator",
      select : "username -_id"
    })
    if (!senderId || !senderId.creator) {
      return res
        .status(404)
        .json({ message: "Requested Content is not availaible." });
    }
    const content = await Content.find({
      creator: senderId.creator,
    })
      .select("title description type tags link");
    res.status(200).send({
      username: (senderId.creator as any).username,
      content : content
    });
  } catch (err) {
    if (err instanceof Error)
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: err });
  }
}

export { share, receive };
