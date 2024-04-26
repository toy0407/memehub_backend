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
    }
  },
  {
    timestamps: true,
  }
);

const UserDbModel = mongoose.model("UserDbModel", userDbSchema);

export { UserDbModel };
