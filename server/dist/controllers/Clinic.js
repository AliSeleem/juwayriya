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
exports.toggleTherapistAvailability = exports.getTherapistAvailability = exports.updateClincData = exports.getClincData = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Clinic_1 = __importDefault(require("../models/Clinic"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
// Get data --> for visitors and admin
exports.getClincData = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const clinic = yield Clinic_1.default.findById("670e5bc0c555cb5690a02c42");
    if (!clinic) {
        return next(new ApiError_1.default("clinic not found", 404));
    }
    res.status(200).json({ msg: "Data retrieved successfully", data: clinic });
}));
// Update data --> for admin
exports.updateClincData = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const clinic = yield Clinic_1.default.findByIdAndUpdate("670e5bc0c555cb5690a02c42", req.body, {
        new: true,
    });
    if (!clinic) {
        return next(new ApiError_1.default("clinic not found", 404));
    }
    res.status(200).json({ msg: "Data updated successfully", data: clinic });
}));
// Get therapist availability --> for patients
exports.getTherapistAvailability = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const clinic = yield Clinic_1.default.findById("670e5bc0c555cb5690a02c42");
    if (!clinic) {
        return next(new ApiError_1.default("clinic not found", 404));
    }
    res.status(200).json({
        msg: "Availability returned successfully",
        data: { available: clinic.therapistAvailability },
    });
}));
// Toggle therapist availability --> for admin
exports.toggleTherapistAvailability = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const clinic = yield Clinic_1.default.findByIdAndUpdate("670e5bc0c555cb5690a02c42", {
        therapistAvailability: req.body.therapistAvailability,
    }, { new: true });
    if (!clinic) {
        return next(new ApiError_1.default("clinic not found", 404));
    }
    res.status(200).json({
        msg: "Availability updated successfully",
        data: { available: clinic.therapistAvailability },
    });
}));
