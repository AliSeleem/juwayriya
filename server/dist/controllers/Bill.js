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
exports.deleteBill = exports.setBillAsPaid = exports.getBills = exports.makeBill = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Bill_1 = __importDefault(require("../models/Bill"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
// Make bill
exports.makeBill = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bill = yield Bill_1.default.create(req.body);
    if (!bill) {
        return next(new ApiError_1.default("Can not make bill", 500));
    }
    res.status(201).json({ msg: "Bill made successfully", data: bill });
}));
// Get bills
exports.getBills = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bills = yield Bill_1.default.find();
    if (!bills) {
        return next(new ApiError_1.default("Can not get bills", 500));
    }
    res.status(200).json({ msg: "Bills retrieved successfully", length: bills.length, data: bills });
}));
// Set bill as paid
exports.setBillAsPaid = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bill = yield Bill_1.default.findByIdAndUpdate(req.params.id, { status: "Paid" }, { new: true });
    if (!bill) {
        return next(new ApiError_1.default("Can not find bill", 500));
    }
    res.status(200).json({ msg: "Bill paid successfully", data: bill });
}));
// Delete bill
exports.deleteBill = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bill = yield Bill_1.default.findByIdAndDelete(req.params.id);
    if (!bill) {
        return next(new ApiError_1.default("Can not find bill", 500));
    }
    res.status(200).json({ msg: "Bill deleted successfully" });
}));
