import mongoose, { Schema, Document } from "mongoose";

interface CommentGroup extends Document {
  memeId: mongoose.Types.ObjectId;
  comments: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const commentGroupDbSchema: Schema<CommentGroup> = new Schema<CommentGroup>(
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
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "CommentDbModel",
        required: true,
      },
    ],
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    collection: "CommentGroupCollection",
  }
);

const CommentGroupDbModel = mongoose.model<CommentGroup>(
  "CommentGroupDbModel",
  commentGroupDbSchema
);

export { CommentGroupDbModel };
