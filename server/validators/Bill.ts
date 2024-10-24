import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../middleware/validatorMiddleware";

export const makeBillValidator: RequestHandler[] = [
	check("type")
		.notEmpty()
		.withMessage("Type is required")
		.isString()
		.withMessage("Type must be string"),
	check("description")
		.notEmpty()
		.withMessage("Description is required")
		.isString()
		.withMessage("Description must be string"),
	check("amount")
		.notEmpty()
		.withMessage("Amount is required")
		.isNumeric()
		.withMessage("Amount must be numeric"),
	check("date").notEmpty().withMessage("Date is required"),
	check("appointment")
		.optional()
		.isMongoId()
		.withMessage("Appointment must be a valid MongoDB ID"),
	check("items").optional().isArray().withMessage("items must be array"),
	validatorMiddleware,
];

export const setBillAsPaidValidator: RequestHandler[] = [
	check("id")
		.notEmpty()
		.withMessage("Id is required")
		.isMongoId()
		.withMessage("Id must be mongo id"),
];

export const deleteBillValidator: RequestHandler[] = [
	check("id")
		.notEmpty()
		.withMessage("Id is required")
		.isMongoId()
		.withMessage("Id must be mongo id"),
];
