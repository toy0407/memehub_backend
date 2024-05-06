const mongoose = require("mongoose");

const reactionDbSchema = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    memeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MemeDbModel",
      required: true,
    },
    reactionType: {
      type: String,
      enum: ["upvote", "downvote"],
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
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
  }
);

const ReactionDbModel = mongoose.model("ReactionDbModel", reactionDbSchema);

export { ReactionDbModel };
