import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../middleware/validatorMiddleware";

export const updateClincDataValidator: RequestHandler[] = [
	check("name")
		.optional()
		.isString()
		.withMessage("Name must be string")
		.isLength({ min: 3, max: 15 })
		.withMessage("Name must be between 3 and 15 characters"),
	check("summary")
		.optional()
		.isString()
		.withMessage("summary must be string")
		.isLength({ min: 10, max: 50 })
		.withMessage("summary must be between 10 and 50 characters"),
	check("address")
		.optional()
		.isArray()
		.withMessage("address must be array of strings"),
	check("contact")
		.optional()
		.isArray()
		.withMessage("contact must be array of strings"),
	check("openHours")
		.optional()
		.isString()
		.withMessage("openHours must be string"),
	check("therapistAvailability")
		.optional()
		.isBoolean()
		.withMessage("therapistAvailability must be boolean"),
	validatorMiddleware,
];

export const toggleTherapistAvailabilityValidator: RequestHandler[] = [
	check("therapistAvailability")
		.optional()
		.isBoolean()
		.withMessage("therapistAvailability must be boolean"),
	validatorMiddleware,
];
