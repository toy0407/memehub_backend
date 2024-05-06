import mongoose, { Schema, Document } from "mongoose";

interface ReactionGroup extends Document {
  memeId: mongoose.Types.ObjectId;
  reactions: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const reactionGroupDbSchema: Schema<ReactionGroup> = new Schema<ReactionGroup>(
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

const ReactionGroupDbModel = mongoose.model<ReactionGroup>(
  "ReactionGroupDbModel",
  reactionGroupDbSchema
);

export { ReactionGroupDbModel };
