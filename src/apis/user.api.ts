import { Request, Response } from "express";
import { UserValidations } from "../validations/user.schema";
import { Validator } from "../utils/validator.utils";
import Logger from "../utils/logger.utils";
import { UserService } from "../services/user.service";
import { CommonUtils } from "../utils/commons.utils";
import {
  RefreshTokenRequestModel,
  UserLoginRequestModel,
  UserRegisterRequestModel,
} from "../models/request/user.request";

const loginUser = async (req: Request, res: Response) => {
  try {
    const loginCredentials = await Validator.validate<UserLoginRequestModel>(
      req.body,
      UserValidations.userLoginValidationSchema
    );
    if (CommonUtils.isDefined(loginCredentials.error)) {
      Logger.debug(`Login Credentials Error: ${loginCredentials.error}`);
      return res
        .status(400)
        .json({ message: loginCredentials.error!.toString() });
    }
    const loginUserResult = await UserService.loginUser(
      loginCredentials.value!.email,
      loginCredentials.value!.password
    );
    if (!loginUserResult.isSuccess)
      return res
        .status(404)
        .json({ message: loginUserResult.error.toString() });

    return res
      .status(200)
      .json({ message: "User Login Successful", data: loginUserResult.data });
  } catch (err: any) {
    Logger.error(`Internal Server Error: ${err}`);
    return res.status(500).json({ message: err.toString() });
  }
};

const registerUser = async (req: Request, res: Response) => {
  try {
    const registrationCredentials =
      await Validator.validate<UserRegisterRequestModel>(
        req.body,
        UserValidations.userRegisterValidationSchema
      );

    if (CommonUtils.isDefined(registrationCredentials.error)) {
      Logger.debug(
        `Registration Credentials Error: ${registrationCredentials.error}`
      );
      return res
        .status(400)
        .json({ message: registrationCredentials.error!.toString() });
    }

    const registerUserResult = await UserService.registerUser(
      registrationCredentials.value!.email,
      registrationCredentials.value!.password,
      registrationCredentials.value!.userName
    );
    if (!registerUserResult.isSuccess)
      return res
        .status(404)
        .json({ message: registerUserResult.error.toString() });

    return res.status(200).json({
      message: "User Registration Successful",
      data: registerUserResult.data,
    });
  } catch (err: any) {
    Logger.error(`Internal Server Error: ${err}`);
    return res.status(500).json({ message: err.toString() });
  }
};

const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    const reqBody = await Validator.validate<RefreshTokenRequestModel>(
      req.body,
      UserValidations.refreshTokenSchema
    );
    if (CommonUtils.isDefined(reqBody.error)) {
      Logger.debug(`Refresh Token Error: ${reqBody.error}`);
      return res.status(404).json({ message: reqBody.error!.toString() });
    }
    const refreshTokenResult = await UserService.refreshAccessToken(
      reqBody.value!.refreshToken
    );
    if (!refreshTokenResult.isSuccess) {
      Logger.debug(`Refresh Token Error: ${refreshTokenResult.error}`);
      return res
        .status(404)
        .json({ message: refreshTokenResult.error.toString() });
    }
    Logger.debug(`Refresh Token Success: ${refreshTokenResult}`)
    return res.status(200).json({
      message: "Refresh Access Token Successful",
      data: refreshTokenResult.data,
    });
  } catch (err: any) {
    Logger.error(`Internal Server Error: ${err}`);
    return res.status(500).json({ message: err.toString() });
  }
};

export const UserApi = {
  loginUser,
  registerUser,
  refreshAccessToken,
};
