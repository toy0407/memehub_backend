import mongoose, { Schema, Document } from "mongoose";

interface ReactionGroupDbModel extends Document {
  memeId: mongoose.Types.ObjectId;
  reactions: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const reactionGroupDbSchema: Schema<ReactionGroupDbModel> =
  new Schema<ReactionGroupDbModel>(
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
      reactions: [
        {
          type: Schema.Types.ObjectId,
          ref: "ReactionDbModel",
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
      collection: "ReactionGroupCollection",
    }
  );

const ReactionGroup = mongoose.model<ReactionGroupDbModel>(
  "ReactionGroup",
  reactionGroupDbSchema
);

export { ReactionGroup };
