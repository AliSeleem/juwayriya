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
exports.addFeedback = exports.addNotes = exports.updateAppointment = exports.setAppointmentDone = exports.setAppointmentAccepted = exports.cancelAppointment = exports.getUserAppointments = exports.getAppointments = exports.createAppointment = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Appointment_1 = __importDefault(require("../models/Appointment"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const Bill_1 = __importDefault(require("../models/Bill"));
// Create appointment -> for admin and user
exports.createAppointment = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if the dates are available
        const ap = yield Appointment_1.default.find({
            date: { $in: [req.body.date[0], req.body.date[1]] },
        });
        if (ap.length > 0) {
            return next(new ApiError_1.default("One or both dates unavailable", 400));
        }
        // Create appointment
        const app = yield Appointment_1.default.create(req.body);
        if (!app) {
            return next(new ApiError_1.default("Can not create appointment", 400));
        }
        // Return appointment
        res
            .status(201)
            .json({ msg: "Appointment created successfully", data: app });
    }
    catch (error) {
        // Return error
        return next(new ApiError_1.default("Can not create appointment", 400));
    }
}));
// Get appointments -> for admin
exports.getAppointments = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get appointments
        const app = yield Appointment_1.default.find().populate("user");
        // Return appointments
        res
            .status(200)
            .json({ msg: "Appointments retrieved successfully", data: app });
    }
    catch (err) {
        // Return error
        return next(new ApiError_1.default("Can not get appointments", 400));
    }
}));
// Get user appointments -> for user
exports.getUserAppointments = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Get appointments
        const app = yield Appointment_1.default.find({ user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id });
        // Return appointments
        res
            .status(200)
            .json({ msg: "Appointments retrieved successfully", data: app });
    }
    catch (err) {
        // Return error
        return next(new ApiError_1.default("Can not get appointments", 400));
    }
}));
// Cancel appointment -> for admin and user
exports.cancelAppointment = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find appointment
        const app = yield Appointment_1.default.findOne({
            _id: req.params.id,
            user: req.body.user,
        });
        // If appointment not found, return an error
        if (!app) {
            return next(new ApiError_1.default("Appointment not found", 404));
        }
        // If appointment found, delete it
        yield app.deleteOne();
        // Send success response
        res.status(200).json({ msg: "Appointment canceled" });
    }
    catch (error) {
        // Return error
        return next(new ApiError_1.default("Cannot cancel appointment", 400));
    }
}));
// Set appointment accepted -> for admin
exports.setAppointmentAccepted = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find appointment
        const app = yield Appointment_1.default.findByIdAndUpdate(req.params.id, {
            status: "Accepted",
        }, { new: true });
        if (!app) {
            return next(new ApiError_1.default("Appointment not found", 404));
        }
        res.status(201).json({ msg: "Appointment accepted", data: app });
    }
    catch (error) {
        // Return error
        return next(new ApiError_1.default("Can not accept appointment", 400));
    }
}));
// Set appointment done -> for admin
exports.setAppointmentDone = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Find appointment
    let app = yield Appointment_1.default.findById(req.params.id);
    if (!app) {
        return next(new ApiError_1.default("Can not done appointment", 400));
    }
    if (app.status === "Done") {
        return next(new ApiError_1.default("appointment already done ", 400));
    }
    app.status = "Done";
    app.save({ validateModifiedOnly: true });
    const bill = yield Bill_1.default.create({
        type: "income",
        amount: 1000,
        description: `appointment from user`,
        appointment: app._id,
        date: Date.now(),
    });
    res.status(201).json({ msg: "Appointment done", data: app });
}));
// Update appointment -> for admin and user
exports.updateAppointment = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get date from req.body
        const date = req.body.date;
        // Find appointment
        const app = yield Appointment_1.default.findByIdAndUpdate(req.params.id, {
            date: date,
        }, {
            new: true,
        });
        res
            .status(202)
            .json({ msg: "Appointment updated successfully", date: app });
    }
    catch (error) {
        // Return error
        return next(new ApiError_1.default("Can not update appointment", 400));
    }
}));
// Add notes -> for admin
exports.addNotes = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get notes from req.body
        const notes = req.body.notes;
        // Find appointment
        const app = yield Appointment_1.default.findByIdAndUpdate(req.params.id, {
            notes: notes,
        }, { new: true });
        if (!app) {
            return next(new ApiError_1.default("Appointment not found", 404));
        }
        if (app.status !== "Done") {
            return next(new ApiError_1.default("Appointment not Done", 404));
        }
        res.status(200).json({ msg: "Notes added successfully", data: app });
    }
    catch (error) {
        // Return error
        return next(new ApiError_1.default("Can not add notes", 400));
    }
}));
// Add feedbak -> for user
exports.addFeedback = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Get notes from req.body
        const feedback = req.body.feedback;
        // Find appointment
        const app = yield Appointment_1.default.findOneAndUpdate({
            _id: req.params.id,
            user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
        }, { feedback: feedback }, { new: true });
        if (!app) {
            return next(new ApiError_1.default("Appointment not found", 404));
        }
        if (app.status !== "Done") {
            return next(new ApiError_1.default("Appointment not Done", 404));
        }
        res.status(200).json({ msg: "Feedback added successfully", data: app });
    }
    catch (error) {
        // Return error
        return next(new ApiError_1.default("Can not add notes", 400));
    }
}));
