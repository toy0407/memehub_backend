const mongoose = require("mongoose");

const commentGroupDbSchema = new Schema(
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
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
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
  }
);

const CommentGroupDbModel = mongoose.model(
  "CommentGroupDbModel",
  commentGroupDbSchema
);

export { CommentGroupDbModel };
