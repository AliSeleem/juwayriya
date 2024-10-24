import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Appointment from "../models/Appointment";
import ApiError from "../utils/ApiError";
import Bill from "../models/Bill";

// Create appointment -> for admin and user
export const createAppointment = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			// Check if the dates are available
			const ap = await Appointment.find({
				date: { $in: [req.body.date[0], req.body.date[1]] },
			});

			if (ap.length > 0) {
				return next(new ApiError("One or both dates unavailable", 400));
			}
			// Create appointment
			const app = await Appointment.create(req.body);
			if (!app) {
				return next(new ApiError("Can not create appointment", 400));
			}
			// Return appointment
			res
				.status(201)
				.json({ msg: "Appointment created successfully", data: app });
		} catch (error) {
			// Return error
			return next(new ApiError("Can not create appointment", 400));
		}
	}
);

// Get appointments -> for admin
export const getAppointments = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			// Get appointments
			const app = await Appointment.find().populate("user");
			// Return appointments
			res
				.status(200)
				.json({ msg: "Appointments retrieved successfully", data: app });
		} catch (err) {
			// Return error
			return next(new ApiError("Can not get appointments", 400));
		}
	}
);

// Get user appointments -> for user
export const getUserAppointments = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			// Get appointments
			const app = await Appointment.find({ user: req.user?._id });
			// Return appointments
			res
				.status(200)
				.json({ msg: "Appointments retrieved successfully", data: app });
		} catch (err) {
			// Return error
			return next(new ApiError("Can not get appointments", 400));
		}
	}
);
// Cancel appointment -> for admin and user
export const cancelAppointment = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			// Find appointment
			const app = await Appointment.findOne({
				_id: req.params.id,
				user: req.body.user,
			});

			// If appointment not found, return an error
			if (!app) {
				return next(new ApiError("Appointment not found", 404));
			}

			// If appointment found, delete it
			await app.deleteOne();

			// Send success response
			res.status(200).json({ msg: "Appointment canceled" });
		} catch (error) {
			// Return error
			return next(new ApiError("Cannot cancel appointment", 400));
		}
	}
);

// Set appointment accepted -> for admin
export const setAppointmentAccepted = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			// Find appointment
			const app = await Appointment.findByIdAndUpdate(
				req.params.id,
				{
					status: "Accepted",
				},
				{ new: true }
			);
			if (!app) {
				return next(new ApiError("Appointment not found", 404));
			}
			res.status(201).json({ msg: "Appointment accepted", data: app });
		} catch (error) {
			// Return error
			return next(new ApiError("Can not accept appointment", 400));
		}
	}
);

// Set appointment done -> for admin
export const setAppointmentDone = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		// Find appointment
		let app = await Appointment.findById(req.params.id);
		if (!app) {
			return next(new ApiError("Can not done appointment", 400));
		}
		if (app.status === "Done") {
			return next(new ApiError("appointment already done ", 400));
		}
		app.status = "Done";
		app.save({ validateModifiedOnly: true });
		const bill = await Bill.create({
			type: "income",
			amount: 1000,
			description: `appointment from user`,
			appointment: app._id,
			date: Date.now(),
		});

		res.status(201).json({ msg: "Appointment done", data: app });
	}
);

// Update appointment -> for admin and user
export const updateAppointment = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			// Get date from req.body
			const date = req.body.date;
			// Find appointment
			const app = await Appointment.findByIdAndUpdate(
				req.params.id,
				{
					date: date,
				},
				{
					new: true,
				}
			);
			res
				.status(202)
				.json({ msg: "Appointment updated successfully", date: app });
		} catch (error) {
			// Return error
			return next(new ApiError("Can not update appointment", 400));
		}
	}
);

// Add notes -> for admin
export const addNotes = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			// Get notes from req.body
			const notes = req.body.notes;
			// Find appointment
			const app = await Appointment.findByIdAndUpdate(
				req.params.id,
				{
					notes: notes,
				},
				{ new: true }
			);
			if (!app) {
				return next(new ApiError("Appointment not found", 404));
			}
			if (app.status !== "Done") {
				return next(new ApiError("Appointment not Done", 404));
			}
			res.status(200).json({ msg: "Notes added successfully", data: app });
		} catch (error) {
			// Return error
			return next(new ApiError("Can not add notes", 400));
		}
	}
);

// Add feedbak -> for user
export const addFeedback = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			// Get notes from req.body
			const feedback = req.body.feedback;
			// Find appointment
			const app = await Appointment.findOneAndUpdate(
				{
					_id: req.params.id,
					user: req.user?._id,
				},
				{ feedback: feedback },
				{ new: true }
			);
			if (!app) {
				return next(new ApiError("Appointment not found", 404));
			}
			if (app.status !== "Done") {
				return next(new ApiError("Appointment not Done", 404));
			}
			res.status(200).json({ msg: "Feedback added successfully", data: app });
		} catch (error) {
			// Return error
			return next(new ApiError("Can not add notes", 400));
		}
	}
);
