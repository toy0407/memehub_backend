import { Request, Response } from "express";
import Validator from "../utils/validator.utils";
import { UserValidations } from "../validations/user.schema";
import Logger from "../utils/logger.utils";
import { User } from "../models/user.model";

const loginUser = async (req: Request, res: Response) => {
  const loginCredentials = Validator.validate(
    req.body,
    UserValidations.userLoginValidationSchema
  );
  if (loginCredentials.error != null) {
    Logger.error(`Login Credentials Error: ${loginCredentials.error}`);
    res.status(400).json({ message: loginCredentials.error });
  }
};

const registerUser = async (req: Request, res: Response) => {};

const refreshAccessToken = async (req: Request, res: Response) => {};

export const UserApi = {
  loginUser,
  registerUser,
  refreshAccessToken,
};
