"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBillValidator = exports.setBillAsPaidValidator = exports.makeBillValidator = void 0;
const express_validator_1 = require("express-validator");
const validatorMiddleware_1 = __importDefault(require("../middleware/validatorMiddleware"));
exports.makeBillValidator = [
    (0, express_validator_1.check)("type")
        .notEmpty()
        .withMessage("Type is required")
        .isString()
        .withMessage("Type must be string"),
    (0, express_validator_1.check)("description")
        .notEmpty()
        .withMessage("Description is required")
        .isString()
        .withMessage("Description must be string"),
    (0, express_validator_1.check)("amount")
        .notEmpty()
        .withMessage("Amount is required")
        .isNumeric()
        .withMessage("Amount must be numeric"),
    (0, express_validator_1.check)("date").notEmpty().withMessage("Date is required"),
    (0, express_validator_1.check)("appointment")
        .optional()
        .isMongoId()
        .withMessage("Appointment must be a valid MongoDB ID"),
    (0, express_validator_1.check)("items").optional().isArray().withMessage("items must be array"),
    validatorMiddleware_1.default,
];
exports.setBillAsPaidValidator = [
    (0, express_validator_1.check)("id")
        .notEmpty()
        .withMessage("Id is required")
        .isMongoId()
        .withMessage("Id must be mongo id"),
];
exports.deleteBillValidator = [
    (0, express_validator_1.check)("id")
        .notEmpty()
        .withMessage("Id is required")
        .isMongoId()
        .withMessage("Id must be mongo id"),
];
