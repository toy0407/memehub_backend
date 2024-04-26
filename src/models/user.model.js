const mongoose = require("mongoose");

const userDbSchema = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    profileImageUrl: {
      type: String,
    },
    memesList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "MemeDbModel",
    }],
    upvotedMemesList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "MemeDbModel",
    }],
    downvotedMemesList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "MemeDbModel",
    }],
  },
  {
    timestamps: true,
  }
);

const UserDbModel = mongoose.model("UserDbModel", userDbSchema);

export { UserDbModel };
