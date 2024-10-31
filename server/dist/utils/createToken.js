"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResetToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (payload, role) => jsonwebtoken_1.default.sign({ _id: payload, role: role }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRED_TIME,
});
exports.createToken = createToken;
const createResetToken = (payload, role) => jsonwebtoken_1.default.sign({ _id: payload, role: role }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_RESET_EXPIRED_TIME,
});
exports.createResetToken = createResetToken;
