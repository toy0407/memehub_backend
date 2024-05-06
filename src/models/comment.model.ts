import mongoose, { Schema, Document } from "mongoose";

interface Comment extends Document {
  memeId: mongoose.Types.ObjectId;
  body: string;
  author: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const commentDbSchema: Schema<Comment> = new Schema<Comment>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    memeId: {
      type: Schema.Types.ObjectId,
      ref: "MemeDbModel",
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "UserDbModel",
      required: true,
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    collection: "CommentCollection",
  }
);

const CommentDbModel = mongoose.model<Comment>(
  "CommentDbModel",
  commentDbSchema
);

export { CommentDbModel };
