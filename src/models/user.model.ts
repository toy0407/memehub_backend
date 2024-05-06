import mongoose, { Schema, Document } from "mongoose";

interface User extends Document {
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

const userDbSchema: Schema<User> = new Schema<User>(
  {
    _id: {
      type: Schema.Types.ObjectId,
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
    age: {
      type: Number,
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

const UserDbModel = mongoose.model<User>("UserDbModel", userDbSchema);

export { UserDbModel };
