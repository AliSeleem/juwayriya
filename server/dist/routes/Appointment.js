"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Appointment_1 = require("../controllers/Appointment");
const Appointment_2 = require("../validators/Appointment");
const Auth_1 = require("../controllers/Auth");
const Appointment = (0, express_1.Router)();
// Protect routes
Appointment.use(Auth_1.protectRoutes);
// User routes
Appointment.get("/userAppointments", (0, Auth_1.allowedTo)("user"), Appointment_1.getUserAppointments);
Appointment.patch("/:id/feedback", (0, Auth_1.allowedTo)("user"), Appointment_2.addFeedbackValidator, Appointment_1.addFeedback);
// Commen routes
Appointment.post("/", Appointment_2.createAppointmentValidator, Appointment_1.createAppointment);
Appointment.patch("/:id/cancel", Appointment_2.cancelAppointmentValidator, Appointment_1.cancelAppointment);
Appointment.patch("/:id/update", Appointment_2.updateAppointmentValidator, Appointment_1.updateAppointment);
// Admin routes
Appointment.get("/", (0, Auth_1.allowedTo)("admin"), Appointment_1.getAppointments);
Appointment.patch("/:id/accepted", (0, Auth_1.allowedTo)("admin"), Appointment_2.setAppointmentAcceptedValidator, Appointment_1.setAppointmentAccepted);
Appointment.patch("/:id/done", (0, Auth_1.allowedTo)("admin"), Appointment_2.setAppointmentDoneValidator, Appointment_1.setAppointmentDone);
Appointment.patch("/:id/notes", (0, Auth_1.allowedTo)("admin"), Appointment_2.addNotesValidator, Appointment_1.addNotes);
exports.default = Appointment;
