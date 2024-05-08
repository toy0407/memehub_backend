import mongoose, { Schema, Document } from "mongoose";

interface MemeDbModel extends Document {
  creator: mongoose.Types.ObjectId;
  url: string;
  audioUrl?: string;
  caption?: string;
  nsfw?: boolean;
  spoiler?: boolean;
  commentGroup?: mongoose.Types.ObjectId;
  reactionGroup?: mongoose.Types.ObjectId;
}

const memeDbSchema: Schema<MemeDbModel> = new Schema<MemeDbModel>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "UserDbModel",
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    audioUrl: {
      type: String,
    },
    caption: {
      type: String,
    },
    nsfw: {
      type: Boolean,
    },
    spoiler: {
      type: Boolean,
    },
    commentGroup: {
      type: Schema.Types.ObjectId,
      ref: "CommentGroupDbModel",
    },
    reactionGroup: {
      type: Schema.Types.ObjectId,
      ref: "ReactionGroupDbModel",
    },
  },
  {
    timestamps: true,
    collection: "MemeCollection",
  }
);

const Meme = mongoose.model<MemeDbModel>("Meme", memeDbSchema);

export { Meme };
