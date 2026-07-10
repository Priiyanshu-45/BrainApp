import { model, Schema } from "mongoose";


const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  },
);

const contentType = ["note", "link", "youtube", "instagram", "twitter"];

const ContentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: contentType,
      required: true,
    },
    description: {
      type: String,
    },
    link: {
      type: String,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const TagSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
});

const User = model("User", UserSchema);
const Content = model("Content", ContentSchema);
const Tag = model("Tag", TagSchema);

export { User, Content, Tag, contentType };
