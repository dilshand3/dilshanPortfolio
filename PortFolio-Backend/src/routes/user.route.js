import { SignUp, verifyEmail, login,logout,checkAuth, shareVerifyUser,shareNonVerifyUser } from "../controller/user.controller.js";
import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

router.route("/checkAuth").get(verifyToken,checkAuth);
router.route("/signup").post(SignUp);
router.route("/verifyEmail").post(verifyEmail);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/VerifyUser").get(shareVerifyUser);
router.route("/NonVerifyUser").get(shareNonVerifyUser);


export default router