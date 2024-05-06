const mongoose = require("mongoose");

const reactionGroupDbSchema = new Schema(
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
    reactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
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
  }
);

const ReactionGroupDbModel = mongoose.model(
  "ReactionGroupDbModel",
  reactionGroupDbSchema
);

export { ReactionGroupDbModel };
