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
    caption: {
        type: String,
    },
    nsfw: {
      type: Boolean,
    },
    spoiler: {
      type: Boolean,
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
    commentList: {
        
    }
  },
  {
    timestamps: true,
  }
);

const MemeDbModel = mongoose.model("MemeDbModel", memeDbSchema);

export { MemeDbModel };
