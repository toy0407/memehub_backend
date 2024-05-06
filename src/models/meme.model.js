const mongoose = require("mongoose");

const memeDbSchema = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "CommentGroupDbModel",
    },
    reactionGroup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ReactionGroupDbModel",
    },
  },
  {
    timestamps: true,
  }
);

const MemeDbModel = mongoose.model("MemeDbModel", memeDbSchema);

export { MemeDbModel };
