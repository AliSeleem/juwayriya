"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Auth_1 = require("../validators/Auth");
const Auth_2 = require("../controllers/Auth");
const User = (0, express_1.Router)();
User.route("/signup").post(Auth_1.signupValidator, Auth_2.signup);
User.route("/login").post(Auth_1.loginValidator, Auth_2.login);
User.route("/forgetPassword").post(Auth_1.sendMailValidator, Auth_2.forgetPassword);
User.route("/verifyCode").post(Auth_2.verifyResetCode);
User.route("/resetCode").put(Auth_1.resetCodeValidator, Auth_2.resetCode);
exports.default = User;
