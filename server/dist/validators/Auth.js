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
exports.resetCodeValidator = exports.sendMailValidator = exports.signupValidator = exports.loginValidator = void 0;
const express_validator_1 = require("express-validator");
const validatorMiddleware_1 = __importDefault(require("../middleware/validatorMiddleware"));
const User_1 = __importDefault(require("../models/User"));
const User_2 = __importDefault(require("../models/User"));
exports.loginValidator = [
    (0, express_validator_1.check)("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email"),
    (0, express_validator_1.check)("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8, max: 20 })
        .withMessage("Password must be at least 8 and no more than 20 characters"),
    validatorMiddleware_1.default,
];
exports.signupValidator = [
    (0, express_validator_1.check)("name")
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 2, max: 50 })
        .withMessage("Name must be at least 2 and no more than 50 characters"),
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
        const existingUser = yield User_2.default.findOne({ phone: val });
        if (existingUser) {
            throw new Error("Phone number is already used");
        }
        return true;
    })),
    (0, express_validator_1.check)("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email")
        .custom((val) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield User_1.default.findOne({ email: val });
        if (user) {
            throw new Error(`email is already exist`);
        }
        return true;
    })),
    (0, express_validator_1.check)("password")
        .isLength({ min: 8, max: 20 })
        .withMessage("Password must be at least 8 and no more than 20 characters")
        .custom((val, { req }) => {
        if (val !== req.body.confirmPassword) {
            throw new Error("passwords doesn't match");
        }
        return true;
    }),
    (0, express_validator_1.check)("confirmPassword")
        .isLength({ min: 8, max: 20 })
        .withMessage("Confirm password must be at least 8 and no more than 20 characters")
        .custom((value, { req }) => value === req.body.password)
        .withMessage("Passwords do not match"),
    (0, express_validator_1.check)("gender")
        .notEmpty()
        .withMessage("gender is required")
        .isString()
        .withMessage("gender must be a string"),
    (0, express_validator_1.check)("dateOfBirth").notEmpty().withMessage("dateOfBirth is required"),
    validatorMiddleware_1.default,
];
exports.sendMailValidator = [
    (0, express_validator_1.check)("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email"),
    validatorMiddleware_1.default,
];
exports.resetCodeValidator = [
    (0, express_validator_1.check)("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters"),
    (0, express_validator_1.check)("confirmPassword")
        .isLength({ min: 8 })
        .withMessage("Confirm password must be at least 8 characters")
        .custom((value, { req }) => value === req.body.password)
        .withMessage("Passwords do not match"),
];
