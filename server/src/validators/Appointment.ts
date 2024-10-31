import { RequestHandler } from "express";
import { check } from "express-validator";
import User from "../models/User";
import validatorMiddleware from "../middleware/validatorMiddleware";

export const createAppointmentValidator: RequestHandler[] = [
	check("user")
		.notEmpty()
		.withMessage("user is required")
		.isMongoId()
		.withMessage("user must be valid mongo id")
		.custom(async (val) => {
			const user = await User.findById(val);
			if (!user) {
				throw new Error("User not found");
			}
			return true;
		}),
	check("date")
		.notEmpty()
		.withMessage("date is required")
		.isArray({ min: 1, max: 2 })
		.withMessage("appointment must be one or tow hours"),
	validatorMiddleware,
];

export const cancelAppointmentValidator: RequestHandler[] = [
	check("id")
		.notEmpty()
		.withMessage("Appointment Id is required")
		.isMongoId()
		.withMessage("Id must be valid mongoId"),
	validatorMiddleware,
];

export const setAppointmentDoneValidator: RequestHandler[] = [
	check("id")
		.notEmpty()
		.withMessage("Appointment Id is required")
		.isMongoId()
		.withMessage("Id must be valid mongoId"),
	validatorMiddleware,
];

export const setAppointmentAcceptedValidator: RequestHandler[] = [
	check("id")
		.notEmpty()
		.withMessage("Appointment Id is required")
		.isMongoId()
		.withMessage("Id must be valid mongoId"),
	validatorMiddleware,
];

export const updateAppointmentValidator: RequestHandler[] = [
	check("id")
		.notEmpty()
		.withMessage("Appointment Id is required")
		.isMongoId()
		.withMessage("Id must be valid mongoId"),
	check("date")
		.notEmpty()
		.withMessage("date is required")
		.isArray({ min: 1, max: 2 })
		.withMessage("appointment must be one or tow hours"),
	validatorMiddleware,
];

export const addNotesValidator: RequestHandler[] = [
	check("id")
		.notEmpty()
		.withMessage("Appointment Id is required")
		.isMongoId()
		.withMessage("Id must be valid mongoId"),
	check("notes")
		.notEmpty()
		.withMessage("Notes is required")
		.isString()
		.withMessage("Notes must be string"),
	validatorMiddleware,
];

export const addFeedbackValidator: RequestHandler[] = [
	check("id")
		.notEmpty()
		.withMessage("Appointment Id is required")
		.isMongoId()
		.withMessage("Id must be valid mongoId"),
	check("feedback")
		.notEmpty()
		.withMessage("Feedback is required")
		.isString()
		.withMessage("Feedback must be string"),
	validatorMiddleware,
];
