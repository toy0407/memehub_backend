const mongoose = require("mongoose");

const commentDbSchema = new Schema(
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
    body: {
      type: String,
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

const CommentDbModel = mongoose.model("CommentDbModel", commentDbSchema);

export { CommentDbModel };
