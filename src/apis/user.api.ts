import { Request, Response } from "express";
import Validator from "../utils/validator.utils";
import { UserValidations } from "../validations/user.schema";
import Logger from "../utils/logger.utils";
import { UserService } from "../services/user.service";
import { CommonUtils } from "../utils/commons.utils";

const loginUser = async (req: Request, res: Response) => {
  try {
    const loginCredentials = Validator.validate(
      req.body,
      UserValidations.userCredentialsValidationSchema
    );

    // Check if the user credentials are present in request
    if (CommonUtils.isDefined(loginCredentials.error)) {
      Logger.error(`Login Credentials Error: ${loginCredentials.error}`);
      return res.status(400).json({ message: loginCredentials.error });
    }

    const loginUserResult = await UserService.loginUser(
      loginCredentials.value.email,
      loginCredentials.value.password
    );
    if (!loginUserResult.isSuccess)
      return res.status(404).json({ message: loginUserResult.error });

    return res
      .status(200)
      .json({ message: "User Login Successful", data: loginUserResult.data });
  } catch (err: any) {
    Logger.error(`Internal Server Error: ${err}`);
    return res.status(500).json({ message: err.toString() });
  }
};

const registerUser = async (req: Request, res: Response) => {
  const registrationCredentials = Validator.validate(
    req.body,
    UserValidations.userCredentialsValidationSchema
  );

  if (CommonUtils.isDefined(registrationCredentials.error)) {
    Logger.error(
      `Registration Credentials Error: ${registrationCredentials.error}`
    );
    return res.status(400).json({ message: registrationCredentials.error });
  }

  const registerUserResult = await UserService.registerUser(
    registrationCredentials.value.email,
    registrationCredentials.value.password
  );
  if (!registerUserResult.isSuccess)
    return res.status(404).json({ message: registerUserResult.error });

  return res.status(200).json({
    message: "User Registration Successful",
    data: registerUserResult.data,
  });
};

const refreshAccessToken = async (req: Request, res: Response) => {};

export const UserApi = {
  loginUser,
  registerUser,
  refreshAccessToken,
};
