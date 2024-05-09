import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { User, UserDbModel } from "../models/db/user.model";
import { CommonUtils } from "../utils/commons.utils";
import Logger from "../utils/logger.utils";
import { GenericResponseModel } from "../models/response/generic.response";

const loginUser = async (
  email: string,
  password: string
): Promise<GenericResponseModel<any>> => {
  // Check if the user is present in database
  const user = await User.findOne<UserDbModel>({ email: email });
  if (CommonUtils.isNullorUndefined(user)) {
    Logger.info("User not found");
    return { isSuccess: false, error: "User not found" };
  }

  // Check if the password is correct
  const isPasswordValid = bcrypt.compare(password, user?.password!);
  if (!isPasswordValid) {
    Logger.info("Incorrect password");
    return { isSuccess: false, error: "Incorrect password" };
  }

  // Login Successful
  const accessToken = _generateAccessToken(user!);
  const refreshToken = _generateRefreshToken(user!);
  Logger.info(`Access token: ${accessToken}, Refresh token: ${refreshToken}`);
  return {
    isSuccess: true,
    data: { accessToken: accessToken, refreshToken: refreshToken },
  };
};

const registerUser = async (
  email: string,
  password: string
): Promise<GenericResponseModel<any>> => {
  // Check for existing user
  const existingUser = await User.findOne<UserDbModel>({ email });
  if (CommonUtils.isDefined(existingUser)) {
    Logger.info("User already exists");
    return { isSuccess: false, error: "User already exists. Please sign in." };
  }

  // Hash user password
  const hashedPassword: string = await bcrypt.hash(password, 10);

  // Create new user with credentials
  const newUser: Partial<UserDbModel> = {
    email: email,
    password: hashedPassword,
  };
  // Insert user in database
  const createNewUserResult: UserDbModel = await User.create(newUser);
  if (CommonUtils.isDefined(createNewUserResult)) {
    Logger.info("New user created");
    return { isSuccess: true };
  }
  Logger.info("Failed to create new user");
  return { isSuccess: false, error: "Failed to create new user" };
};

const _generateAccessToken = (user: UserDbModel): string => {
  return jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });
};

const _generateRefreshToken = (user: UserDbModel): string => {
  return jwt.sign({ userId: user.id }, process.env.JWT_REFRESH_TOKEN_SECRET!, {
    expiresIn: "10d",
  });
};

export const UserService = {
  loginUser,
  registerUser,
};
