import mongoose, { Schema, Document } from "mongoose";

interface CommentGroupDbModel extends Document {
  memeId: mongoose.Types.ObjectId;
  comments: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const commentGroupDbSchema: Schema<CommentGroupDbModel> =
  new Schema<CommentGroupDbModel>(
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

const CommentGroup = mongoose.model<CommentGroupDbModel>(
  "CommentGroup",
  commentGroupDbSchema
);

export { CommentGroup };
