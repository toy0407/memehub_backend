import mongoose, { Schema, Document } from "mongoose";

interface ReactionDbModel extends Document {
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

const reactionDbSchema: Schema<ReactionDbModel> = new Schema<ReactionDbModel>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
    memeId: {
      type: Schema.Types.ObjectId,
      ref: "MemeDbModel",
    },
    reactionType: {
      type: String,
      enum: ["upvote", "downvote"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "UserDbModel",
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

const Reaction = mongoose.model<ReactionDbModel>("Reaction", reactionDbSchema);

export { Reaction };
