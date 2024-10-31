import { Router } from "express";
import {
	loginValidator,
	resetCodeValidator,
	sendMailValidator,
	signupValidator,
} from "../validators/Auth";
import {
	forgetPassword,
	login,
	resetCode,
	signup,
	verifyResetCode,
} from "../controllers/Auth";

const User = Router();

User.route("/signup").post(signupValidator, signup);
User.route("/login").post(loginValidator, login);
User.route("/forgetPassword").post(sendMailValidator, forgetPassword);
User.route("/verifyCode").post(verifyResetCode);
User.route("/resetCode").put(resetCodeValidator, resetCode);

export default User;
