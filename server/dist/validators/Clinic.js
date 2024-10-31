"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleTherapistAvailabilityValidator = exports.updateClincDataValidator = void 0;
const express_validator_1 = require("express-validator");
const validatorMiddleware_1 = __importDefault(require("../middleware/validatorMiddleware"));
exports.updateClincDataValidator = [
    (0, express_validator_1.check)("name")
        .optional()
        .isString()
        .withMessage("Name must be string")
        .isLength({ min: 3, max: 15 })
        .withMessage("Name must be between 3 and 15 characters"),
    (0, express_validator_1.check)("summary")
        .optional()
        .isString()
        .withMessage("summary must be string")
        .isLength({ min: 10, max: 50 })
        .withMessage("summary must be between 10 and 50 characters"),
    (0, express_validator_1.check)("address")
        .optional()
        .isArray()
        .withMessage("address must be array of strings"),
    (0, express_validator_1.check)("contact")
        .optional()
        .isArray()
        .withMessage("contact must be array of strings"),
    (0, express_validator_1.check)("openHours")
        .optional()
        .isString()
        .withMessage("openHours must be string"),
    (0, express_validator_1.check)("therapistAvailability")
        .optional()
        .isBoolean()
        .withMessage("therapistAvailability must be boolean"),
    validatorMiddleware_1.default,
];
exports.toggleTherapistAvailabilityValidator = [
    (0, express_validator_1.check)("therapistAvailability")
        .optional()
        .isBoolean()
        .withMessage("therapistAvailability must be boolean"),
    validatorMiddleware_1.default,
];
