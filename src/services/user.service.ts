import * as jwt from "jsonwebtoken";
import { User, UserDbModel } from "../models/db/user.model";
import { CommonUtils } from "../utils/common-utils.utils";
import Logger from "../utils/logger.utils";

const loginUser = async (email: string, password: string) => {
  // Check if the user is present in database
  const user = await User.findOne<UserDbModel>({ email: email });
  if (CommonUtils.isNullorUndefined(user)) {
    Logger.error("User not found");
    return { isSuccess: false, error: "User not found" };
  }

  // Check if the password is correct
  // const isPasswordValid = await crypto.compare(loginCredentials.value.password, user?.password);
  // if (!isPasswordValid) {
  //   Logger.error("Incorrect password");
  //   res.status(401).json({ message: "Incorrect password" });
  // }

  // Login Successful
  const accessToken = _generateAccessToken(user!);
  const refreshToken = _generateRefreshToken(user!);
  Logger.info(`Access token: ${accessToken}, Refresh token: ${refreshToken}`)
  return {
    isSuccess: true,
    data: { accessToken: accessToken, refreshToken: refreshToken },
  };
};

const _generateAccessToken = (user: UserDbModel): string => {
  return jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "15m",
  });
};

const _generateRefreshToken = (user: UserDbModel): string => {
  return jwt.sign({ userId: user.id }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "10d",
  });
};

export const UserService = {
  loginUser,
};
