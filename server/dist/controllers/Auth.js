"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetCode = exports.verifyResetCode = exports.forgetPassword = exports.allowedTo = exports.protectRoutes = exports.login = exports.signup = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const createToken_1 = require("../utils/createToken");
const sendMail_1 = require("../utils/sendMail");
exports.signup = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.create(req.body);
    const token = (0, createToken_1.createToken)(user._id, user.role);
    res.status(201).json({ data: user, token });
}));
exports.login = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ email: req.body.email });
    if (!user || !(yield bcryptjs_1.default.compare(req.body.password, user.password))) {
        return next(new ApiError_1.default("Invalid email or password", 401));
    }
    const token = (0, createToken_1.createToken)(user._id, user.role);
    res.status(200).json({ message: "logged in successfully", token });
}));
exports.protectRoutes = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // 1- check if token found
    let token = "";
    if ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    else {
        return next(new ApiError_1.default("login first to access the application", 401));
    }
    // 2- check if token not expired
    const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
    // 3- check if user exist
    const currentUser = yield User_1.default.findById(decodedToken._id);
    if (!currentUser) {
        return next(new ApiError_1.default("user doesn't exist", 401));
    }
    // 4- check if password changed
    if (currentUser.passwordChangedAt instanceof Date) {
        const changedPasswordTime = parseInt((currentUser.passwordChangedAt.getTime() / 1000).toString());
        if (changedPasswordTime > decodedToken.iat) {
            return next(new ApiError_1.default("please login again", 401));
        }
    }
    req.user = currentUser;
    next();
}));
const allowedTo = (...roles) => (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!roles.includes((_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== null && _b !== void 0 ? _b : "")) {
        return next(new ApiError_1.default("you don't have permission to perform this action", 403));
    }
    next();
}));
exports.allowedTo = allowedTo;
exports.forgetPassword = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ email: req.body.email });
    if (!user) {
        return next(new ApiError_1.default(`user not found`, 404));
    }
    const resetcode = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetCode = crypto_1.default
        .createHash("sha256")
        .update(resetcode)
        .digest("hex");
    user.resetCodeExpireTime = Date.now() + 10 * 60 * 1000;
    user.resetCodeVerify = false;
    const message = `your reset password code is ${resetcode} available for 10 minutes`;
    try {
        yield (0, sendMail_1.sendMail)({ email: user.email, subject: "reset password", message });
        yield user.save({ validateModifiedOnly: true });
    }
    catch (error) {
        return next(new ApiError_1.default("error sending email", 500));
    }
    const resetToken = (0, createToken_1.createResetToken)(user._id, user.role);
    res.json({ message: "reset password code sent to your email", resetToken });
}));
exports.verifyResetCode = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let resetToken = "";
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        resetToken = req.headers.authorization.split(" ")[1];
    }
    else {
        return next(new ApiError_1.default("get your reset code first", 400));
    }
    const decodedToken = jsonwebtoken_1.default.verify(resetToken, process.env.JWT_SECRET_KEY);
    const hashedResetcCode = crypto_1.default
        .createHash("sha256")
        .update(req.body.resetCode)
        .digest("hex");
    const user = yield User_1.default.findOne({
        _id: decodedToken._id,
        resetCode: hashedResetcCode,
        resetCodeExpireTime: { $gt: Date.now() },
    });
    if (!user) {
        return next(new ApiError_1.default("invalid reset code", 400));
    }
    user.resetCodeVerify = true;
    yield user.save({ validateModifiedOnly: true });
    res.status(200).json({ message: "reset code verified" });
}));
exports.resetCode = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let resetToken = "";
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        resetToken = req.headers.authorization.split(" ")[1];
    }
    else {
        return next(new ApiError_1.default("you can't do this action", 400));
    }
    const decodedToken = jsonwebtoken_1.default.verify(resetToken, process.env.JWT_SECRET_KEY);
    const user = yield User_1.default.findOne({
        _id: decodedToken._id,
        resetCodeVerify: true,
    });
    if (!user) {
        return next(new ApiError_1.default("verify your reset code first", 400));
    }
    user.password = req.body.password;
    user.resetCode = undefined;
    user.resetCodeExpireTime = undefined;
    user.resetCodeVerify = undefined;
    user.passwordChangedAt = Date.now();
    yield user.save({ validateModifiedOnly: true });
    res.status(200).json({ message: "your password has been changed" });
}));
