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
exports.addFeedbackValidator = exports.addNotesValidator = exports.updateAppointmentValidator = exports.setAppointmentAcceptedValidator = exports.setAppointmentDoneValidator = exports.cancelAppointmentValidator = exports.createAppointmentValidator = void 0;
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../models/User"));
const validatorMiddleware_1 = __importDefault(require("../middleware/validatorMiddleware"));
exports.createAppointmentValidator = [
    (0, express_validator_1.check)("user")
        .notEmpty()
        .withMessage("user is required")
        .isMongoId()
        .withMessage("user must be valid mongo id")
        .custom((val) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield User_1.default.findById(val);
        if (!user) {
            throw new Error("User not found");
        }
        return true;
    })),
    (0, express_validator_1.check)("date")
        .notEmpty()
        .withMessage("date is required")
        .isArray({ min: 1, max: 2 })
        .withMessage("appointment must be one or tow hours"),
    validatorMiddleware_1.default,
];
exports.cancelAppointmentValidator = [
    (0, express_validator_1.check)("id")
        .notEmpty()
        .withMessage("Appointment Id is required")
        .isMongoId()
        .withMessage("Id must be valid mongoId"),
    validatorMiddleware_1.default,
];
exports.setAppointmentDoneValidator = [
    (0, express_validator_1.check)("id")
        .notEmpty()
        .withMessage("Appointment Id is required")
        .isMongoId()
        .withMessage("Id must be valid mongoId"),
    validatorMiddleware_1.default,
];
exports.setAppointmentAcceptedValidator = [
    (0, express_validator_1.check)("id")
        .notEmpty()
        .withMessage("Appointment Id is required")
        .isMongoId()
        .withMessage("Id must be valid mongoId"),
    validatorMiddleware_1.default,
];
exports.updateAppointmentValidator = [
    (0, express_validator_1.check)("id")
        .notEmpty()
        .withMessage("Appointment Id is required")
        .isMongoId()
        .withMessage("Id must be valid mongoId"),
    (0, express_validator_1.check)("date")
        .notEmpty()
        .withMessage("date is required")
        .isArray({ min: 1, max: 2 })
        .withMessage("appointment must be one or tow hours"),
    validatorMiddleware_1.default,
];
exports.addNotesValidator = [
    (0, express_validator_1.check)("id")
        .notEmpty()
        .withMessage("Appointment Id is required")
        .isMongoId()
        .withMessage("Id must be valid mongoId"),
    (0, express_validator_1.check)("notes")
        .notEmpty()
        .withMessage("Notes is required")
        .isString()
        .withMessage("Notes must be string"),
    validatorMiddleware_1.default,
];
exports.addFeedbackValidator = [
    (0, express_validator_1.check)("id")
        .notEmpty()
        .withMessage("Appointment Id is required")
        .isMongoId()
        .withMessage("Id must be valid mongoId"),
    (0, express_validator_1.check)("feedback")
        .notEmpty()
        .withMessage("Feedback is required")
        .isString()
        .withMessage("Feedback must be string"),
    validatorMiddleware_1.default,
];
