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
exports.updateUserPasswordValidator = exports.updateUserValidator = exports.createUserValidator = void 0;
const express_validator_1 = require("express-validator");
const validatorMiddleware_1 = __importDefault(require("../middleware/validatorMiddleware"));
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.createUserValidator = [
    (0, express_validator_1.check)("name")
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 3, max: 15 })
        .withMessage("Name must be between 3 and 15 characters")
        .isString()
        .withMessage("Name must be a string"),
    (0, express_validator_1.check)("phone")
        .notEmpty()
        .withMessage("phone is required")
        .isLength({ min: 11, max: 11 })
        .withMessage("phone must be between 11")
        .isString()
        .withMessage("phone must be a string")
        .custom((val) => {
        const regex = /^(010|011|012|015)\d{8}$/;
        if (!regex.test(val)) {
            throw new Error("Invalid Egyption phone number");
        }
        return true;
    })
        .custom((val) => __awaiter(void 0, void 0, void 0, function* () {
        const existingUser = yield User_1.default.findOne({ phone: val });
        if (existingUser) {
            throw new Error("Phone number is already used");
        }
        return true;
    })),
    (0, express_validator_1.check)("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("email must be a valid email")
        .custom((val) => __awaiter(void 0, void 0, void 0, function* () {
        const existingUser = yield User_1.default.findOne({ email: val });
        if (existingUser) {
            throw new Error("Email is already used");
        }
        return true;
    })),
    (0, express_validator_1.check)("password")
        .notEmpty()
        .withMessage("password is required")
        .isLength({ min: 8 })
        .withMessage("password must be 8 characters at least")
        .isString()
        .withMessage("password must be a string"),
    (0, express_validator_1.check)("gender")
        .notEmpty()
        .withMessage("gender is required")
        .isString()
        .withMessage("gender must be a string"),
    (0, express_validator_1.check)("dateOfBirth").notEmpty().withMessage("dateOfBirth is required"),
    validatorMiddleware_1.default,
];
exports.updateUserValidator = [
    (0, express_validator_1.check)("name")
        .optional()
        .isLength({ min: 3, max: 15 })
        .withMessage("Name must be between 3 and 15 characters")
        .isString()
        .withMessage("Name must be a string"),
    (0, express_validator_1.check)("phone")
        .optional()
        .isLength({ min: 11, max: 11 })
        .withMessage("phone must be between 11")
        .isString()
        .withMessage("phone must be a string")
        .custom((val) => {
        const regex = /^(010|011|012|015)\d{8}$/;
        if (!regex.test(val)) {
            throw new Error("Invalid Egyption phone number");
        }
        return true;
    })
        .custom((val) => __awaiter(void 0, void 0, void 0, function* () {
        const existingUser = yield User_1.default.findOne({ phone: val });
        if (existingUser) {
            throw new Error("Phone number is already used");
        }
        return true;
    })),
    (0, express_validator_1.check)("email")
        .optional()
        .isEmail()
        .withMessage("email must be a valid email")
        .custom((val) => __awaiter(void 0, void 0, void 0, function* () {
        const existingUser = yield User_1.default.findOne({ email: val });
        if (existingUser) {
            throw new Error("Email is already used");
        }
        return true;
    })),
    (0, express_validator_1.check)("password")
        .optional()
        .isLength({ min: 8 })
        .withMessage("password must be 8 characters at least")
        .isString()
        .withMessage("password must be a string"),
    (0, express_validator_1.check)("gender").optional().isString().withMessage("gender must be a string"),
    (0, express_validator_1.check)("dateOfBirth").optional(),
    validatorMiddleware_1.default,
];
exports.updateUserPasswordValidator = [
    (0, express_validator_1.check)("oldPassword")
        .notEmpty()
        .withMessage("current password required")
        .isLength({ min: 8 })
        .withMessage("current password length must be 8 chars")
        .custom((val_1, _a) => __awaiter(void 0, [val_1, _a], void 0, function* (val, { req }) {
        const user = yield User_1.default.findById(req.user._id);
        const isCorrectPassword = yield bcryptjs_1.default.compare(val, user.password);
        if (!isCorrectPassword) {
            throw new Error("current password invalid");
        }
    })),
    (0, express_validator_1.check)("newPassword")
        .notEmpty()
        .withMessage("password required")
        .isLength({ min: 8 })
        .withMessage("password length must be 8 chars")
        .custom((val_1, _a) => __awaiter(void 0, [val_1, _a], void 0, function* (val, { req }) {
        if (val !== req.body.confirmPassword) {
            throw new Error("passwords doesn't match");
        }
        return true;
    })),
    (0, express_validator_1.check)("confirmPassword")
        .notEmpty()
        .withMessage("confirm password required")
        .isLength({ min: 8 })
        .withMessage("confirm password length must be 8 chars"),
    validatorMiddleware_1.default,
];
