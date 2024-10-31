"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validatorMiddleware = (req, res, next) => {
    // Explicitly declare return type as void
    const errors = (0, express_validator_1.validationResult)(req); // Use 'errors' instead of 'error' for clarity
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return; // Make sure to return after sending a response
    }
    next(); // Proceed to the next middleware if no validation errors
};
exports.default = validatorMiddleware;
