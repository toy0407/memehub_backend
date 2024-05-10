import { ObjectId } from "mongoose";
import { UserDbModel } from "../db/user.model";

export interface UserLoginRequestModel {
  email: string;
  password: string;
}

export interface UserRegisterRequestModel {
  email: string;
  password: string;
  userName: string;
}

export interface RefreshTokenRequestModel {
  refreshToken: string;
}

export interface ForgotPasswordRequestModel {
  email: string;
}

export interface FindUserByUsernameRequestModel {
  userName: string;
}

export interface UpdateUserRequestModel {
  userId: string;
  update: Partial<UserDbModel>;
}
