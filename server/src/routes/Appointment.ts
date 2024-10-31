import { Router } from "express";
import {
	addFeedback,
	addNotes,
	cancelAppointment,
	createAppointment,
	getAppointments,
	getUserAppointments,
	setAppointmentAccepted,
	setAppointmentDone,
	updateAppointment,
} from "../controllers/Appointment";
import {
	addFeedbackValidator,
	addNotesValidator,
	cancelAppointmentValidator,
	createAppointmentValidator,
	setAppointmentAcceptedValidator,
	setAppointmentDoneValidator,
	updateAppointmentValidator,
} from "../validators/Appointment";
import { allowedTo, protectRoutes } from "../controllers/Auth";

const Appointment = Router();

// Protect routes
Appointment.use(protectRoutes);

// User routes
Appointment.get("/userAppointments", allowedTo("user"), getUserAppointments);

Appointment.patch(
	"/:id/feedback",
	allowedTo("user"),
	addFeedbackValidator,
	addFeedback
);

// Commen routes
Appointment.post("/", createAppointmentValidator, createAppointment);

Appointment.patch("/:id/cancel", cancelAppointmentValidator, cancelAppointment);

Appointment.patch("/:id/update", updateAppointmentValidator, updateAppointment);

// Admin routes
Appointment.get("/", allowedTo("admin"), getAppointments);

Appointment.patch(
	"/:id/accepted",
	allowedTo("admin"),
	setAppointmentAcceptedValidator,
	setAppointmentAccepted
);

Appointment.patch(
	"/:id/done",
	allowedTo("admin"),
	setAppointmentDoneValidator,
	setAppointmentDone
);

Appointment.patch(
	"/:id/notes",
	allowedTo("admin"),
	addNotesValidator,
	addNotes
);

export default Appointment;
