import { Router } from "express";
import { UserApi } from "../apis/user.api";

const router = Router();

router.post("/signup", UserApi.registerUser);
router.post("/login", UserApi.loginUser);
router.post("/refresh-token", UserApi.refreshAccessToken);

export default router;
