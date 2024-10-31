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
exports.updateUserDetails = exports.updatePassword = exports.setLoggedUserId = exports.updateUser = exports.deleteUser = exports.getUsers = exports.getUser = exports.createUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const User_1 = __importDefault(require("../models/User"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Simple CRUD operations -> for admins
exports.createUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.create(req.body);
    if (!user) {
        return next(new ApiError_1.default("Can't create user", 500));
    }
    res.status(201).json({ msg: " User created successfully", data: user });
}));
exports.getUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.params.userId);
    if (!user) {
        return next(new ApiError_1.default("Can't find user", 404));
    }
    res.status(200).json({ msg: " User found successfully", data: user });
}));
exports.getUsers = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.default.find();
    if (!users) {
        return next(new ApiError_1.default("Can't find users", 404));
    }
    res.status(200).json({
        msg: " Users found successfully",
        data: users,
        length: users.length,
    });
}));
exports.deleteUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User_1.default.findByIdAndDelete(req.params.userId);
        res.status(200).json({ msg: "User deleted successfully" });
    }
    catch (error) {
        return next(new ApiError_1.default("Can't delete user", 404));
    }
}));
// Update user -> for admins
exports.updateUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findByIdAndUpdate(req.params.userId, req.body, {
        new: true,
    });
    if (!user) {
        return next(new ApiError_1.default("Can't find user", 404));
    }
    res.status(200).json({ msg: " User updated successfully", data: user });
}));
// Set logged user id
exports.setLoggedUserId = (0, express_async_handler_1.default)((req, res, next) => {
    var _a;
    req.params.userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString();
    next();
});
// update password-> for users
exports.updatePassword = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
    if (!user) {
        return next(new ApiError_1.default("Can't find user", 404));
    }
    const isValidPassword = yield bcryptjs_1.default.compare(req.body.oldPassword, user.password);
    if (!isValidPassword) {
        return next(new ApiError_1.default("Invalid old password", 400));
    }
    const hashedPassword = yield bcryptjs_1.default.hash(req.body.newPassword, 12);
    user.password = hashedPassword;
    yield user.save();
    res.status(200).json({ msg: "Password updated successfully" });
}));
// Update user (name, phone, email, dateOfBirth, gender) -> for users
exports.updateUserDetails = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
    if (!user) {
        return next(new ApiError_1.default("Can't find user", 404));
    }
    const { name, phone, email, dateOfBirth, gender } = req.body;
    user.name = name ? name : user.name;
    user.phone = phone ? phone : user.phone;
    user.email = email ? email : user.email;
    user.dateOfBirth = dateOfBirth ? dateOfBirth : user.dateOfBirth;
    user.gender = gender ? gender : user.gender;
    yield user.save();
    res.status(200).json({ msg: "User details updated successfully" });
}));
