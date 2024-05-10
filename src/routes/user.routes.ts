import { Router } from "express";
import { UserApi } from "../apis/user.api";

const UserRouter = Router();

UserRouter.post("/register", UserApi.registerUser)
  .post("/login", UserApi.loginUser)
  .post("/refresh-token", UserApi.refreshAccessToken)
  .post("/forgot-password", UserApi.forgotPassword)
  .get("/find/username/:userName", UserApi.findUserByUsername)
  .patch("/update", UserApi.updateUser);

export default UserRouter;
