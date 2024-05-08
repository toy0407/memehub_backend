import { Router } from "express";
import { UserApi } from "../apis/user.api";

const UserRouter = Router();

UserRouter.post("/register", UserApi.registerUser)
  .post("/login", UserApi.loginUser)
  .post("/refresh-token", UserApi.refreshAccessToken);

export default UserRouter;
