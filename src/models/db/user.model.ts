import mongoose, { Schema, Document } from "mongoose";

export interface UserDbModel extends Document {
  userName: string;
  fullName: string;
  age: number;
  email: string;
  password: string;
  phoneNumber?: string;
  profileImageUrl?: string;
  memesList?: mongoose.Types.ObjectId[];
  favoriteMemesList?: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const userDbSchema: Schema<UserDbModel> = new Schema<UserDbModel>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
    userName: {
      type: String,
      unique: true,
    },
    fullName: {
      type: String,
    },
    age: {
      type: Number,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    profileImageUrl: {
      type: String,
    },
    memesList: [
      {
        type: Schema.Types.ObjectId,
        ref: "MemeDbModel",
      },
    ],
    favoriteMemesList: [
      {
        type: Schema.Types.ObjectId,
        ref: "MemeDbModel",
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
    collection: "UserCollection",
  }
);

const User = mongoose.model<UserDbModel>("User", userDbSchema);

export { User };
