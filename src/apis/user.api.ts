import { Request, Response } from "express";
import asyncHandler from "express-async-handler"
import Validator from "../utils/validator.utils";
import { UserValidations } from "../validations/user.schema";
import Logger from "../utils/logger.utils";
import { UserService } from "../services/user.service";

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const loginCredentials = Validator.validate(
    req.body,
    UserValidations.userLoginValidationSchema
  );
  
  // Check if the user credentials are present in request
  if (loginCredentials.error != null) {
    Logger.error(`Login Credentials Error: ${loginCredentials.error}`);
    return res.status(400).json({ message: loginCredentials.error });
  }

  const loginUserResult = await UserService.loginUser(loginCredentials.value.email, loginCredentials.value.password)
  if(!loginUserResult.isSuccess) res.status(404).json({ message: "Login failed"}) 

  return res.status(200).json({ message: "Login Successful", data: loginUserResult.data });
});

const registerUser = async (req: Request, res: Response) => {};

const refreshAccessToken = async (req: Request, res: Response) => {};


export const UserApi = {
  loginUser,
  registerUser,
  refreshAccessToken,
};
