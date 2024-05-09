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
    Logger.debug("User not found");
    return { isSuccess: false, error: "User not found" };
  }
  // Check if the password is correct
  const isPasswordValid = bcrypt.compare(password, user?.password!);
  if (!isPasswordValid) {
    Logger.debug("Incorrect password");
    return { isSuccess: false, error: "Incorrect password" };
  }
  // Login Successful
  const accessToken = _generateAccessToken(user!);
  const refreshToken = _generateRefreshToken(user!);
  Logger.debug(`Access token: ${accessToken}, Refresh token: ${refreshToken}`);
  return {
    isSuccess: true,
    data: { accessToken: accessToken, refreshToken: refreshToken },
  };
};

const registerUser = async (
  email: string,
  password: string,
  userName: string
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
    userName: userName,
  };
  // Insert user in database
  const createNewUserResult: UserDbModel = await User.create(newUser);
  if (CommonUtils.isDefined(createNewUserResult)) {
    Logger.debug("New user created");
    return { isSuccess: true };
  }
  Logger.debug("Failed to create new user");
  return { isSuccess: false, error: "Failed to create new user" };
};

const refreshAccessToken = async (
  refreshToken: string
): Promise<GenericResponseModel<any>> => {
  const decoded = jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_TOKEN_SECRET!
  ) as { userId: string };
  const userId = decoded.userId;
  const user = await User.findById<UserDbModel>(userId);
  if (CommonUtils.isNullorUndefined(user)) {
    Logger.debug("User not found from provided token");
    return { isSuccess: false, error: "User not found fron provided token" };
  }
  const newAccessToken = _generateAccessToken(user!);
  return { isSuccess: true, data: { accessToken: newAccessToken } };
};

const forgotPassword = async (
  email: string
): Promise<GenericResponseModel<any>> => {
  // TODO: Implement Forgot Password
  return { isSuccess: true };
};

const findUserByUserName = async (
  userName: string
): Promise<GenericResponseModel<any>> => {
  const user = await User.findOne<UserDbModel>(
    { userName: userName },
    { userName: 1, email: 1, fullName: 1, memesList: 1, profileImageUrl: 1 }
  );
  return {
    isSuccess: true,
    data: { isPresent: CommonUtils.isDefined(user), user: user },
  };
};

const updateUser = async (
  userId: string,
  update: Partial<UserDbModel>
): Promise<GenericResponseModel<any>> => {
  const updateResult = await User.updateOne({ _id: userId }, update, {
    upsert: true,
  });
  return { isSuccess: true, data: { acknowledged: updateResult.acknowledged } };
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
  refreshAccessToken,
  forgotPassword,
  findUserByUserName,
  updateUser,
};
