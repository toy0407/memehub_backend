import mongoose, { Schema, Document } from "mongoose";

interface CommentDbModel extends Document {
  memeId: mongoose.Types.ObjectId;
  body: string;
  author: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const commentDbSchema: Schema<CommentDbModel> = new Schema<CommentDbModel>(
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

const Comment = mongoose.model<CommentDbModel>("Comment", commentDbSchema);

export { Comment };
