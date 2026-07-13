import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true,
  },
);

const contentType = ["note", "link", "youtube", "instagram", "twitter", "other"];

const ContentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      toLowerCase: true,
      enum: contentType,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    link: {
      type: String,
      trim: true
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
    toLowerCase: true,
    trim: true
  },
});

const LinkSchema = new Schema({
  link: {
    type : String,
    unique: true,
    trim: true,
    require: true
  },
  creator : {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, 
{
  timestamps: true
})

const User = model("User", UserSchema);
const Content = model("Content", ContentSchema);
const Tag = model("Tag", TagSchema);

export { User, Content, Tag, contentType };
