import mongoose, { Schema, Document } from "mongoose";

interface Reaction extends Document {
  memeId: mongoose.Types.ObjectId;
  reactionType: ReactionTypes;
  author: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

declare enum ReactionTypes {
  UPVOTE = "upvote",
  DOWNVOTE = "downvote",
}

const reactionDbSchema: Schema<Reaction> = new Schema<Reaction>(
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
    reactionType: {
      type: String,
      enum: ["upvote", "downvote"],
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
    collection: "ReactionCollection",
  }
);

const ReactionDbModel = mongoose.model<Reaction>(
  "ReactionDbModel",
  reactionDbSchema
);

export { ReactionDbModel };
