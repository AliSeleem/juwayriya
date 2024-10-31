import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../middleware/validatorMiddleware";
import User from "../models/User";
import bcrypt from "bcryptjs";

export const createUserValidator: RequestHandler[] = [
	check("name")
		.notEmpty()
		.withMessage("Name is required")
		.isLength({ min: 3, max: 15 })
		.withMessage("Name must be between 3 and 15 characters")
		.isString()
		.withMessage("Name must be a string"),
	check("phone")
		.notEmpty()
		.withMessage("phone is required")
		.isLength({ min: 11, max: 11 })
		.withMessage("phone must be between 11")
		.isString()
		.withMessage("phone must be a string")
		.custom((val) => {
			const regex = /^(010|011|012|015)\d{8}$/;
			if (!regex.test(val)) {
				throw new Error("Invalid Egyption phone number");
			}
			return true;
		})
		.custom(async (val) => {
			const existingUser = await User.findOne({ phone: val });
			if (existingUser) {
				throw new Error("Phone number is already used");
			}
			return true;
		}),
	check("email")
		.notEmpty()
		.withMessage("email is required")
		.isEmail()
		.withMessage("email must be a valid email")
		.custom(async (val) => {
			const existingUser = await User.findOne({ email: val });
			if (existingUser) {
				throw new Error("Email is already used");
			}
			return true;
		}),
	check("password")
		.notEmpty()
		.withMessage("password is required")
		.isLength({ min: 8 })
		.withMessage("password must be 8 characters at least")
		.isString()
		.withMessage("password must be a string"),
	check("gender")
		.notEmpty()
		.withMessage("gender is required")
		.isString()
		.withMessage("gender must be a string"),
	check("dateOfBirth").notEmpty().withMessage("dateOfBirth is required"),
	validatorMiddleware,
];

export const updateUserValidator: RequestHandler[] = [
	check("name")
		.optional()
		.isLength({ min: 3, max: 15 })
		.withMessage("Name must be between 3 and 15 characters")
		.isString()
		.withMessage("Name must be a string"),
	check("phone")
		.optional()
		.isLength({ min: 11, max: 11 })
		.withMessage("phone must be between 11")
		.isString()
		.withMessage("phone must be a string")
		.custom((val) => {
			const regex = /^(010|011|012|015)\d{8}$/;
			if (!regex.test(val)) {
				throw new Error("Invalid Egyption phone number");
			}
			return true;
		})
		.custom(async (val) => {
			const existingUser = await User.findOne({ phone: val });
			if (existingUser) {
				throw new Error("Phone number is already used");
			}
			return true;
		}),
	check("email")
		.optional()
		.isEmail()
		.withMessage("email must be a valid email")
		.custom(async (val) => {
			const existingUser = await User.findOne({ email: val });
			if (existingUser) {
				throw new Error("Email is already used");
			}
			return true;
		}),
	check("password")
		.optional()
		.isLength({ min: 8 })
		.withMessage("password must be 8 characters at least")
		.isString()
		.withMessage("password must be a string"),
	check("gender").optional().isString().withMessage("gender must be a string"),
	check("dateOfBirth").optional(),
	validatorMiddleware,
];

export const updateUserPasswordValidator: RequestHandler[] = [
	check("oldPassword")
		.notEmpty()
		.withMessage("current password required")
		.isLength({ min: 8 })
		.withMessage("current password length must be 8 chars")
		.custom(async (val: string, { req }) => {
			const user = await User.findById(req.user._id);
			const isCorrectPassword: boolean = await bcrypt.compare(
				val,
				user!.password
			);
			if (!isCorrectPassword) {
				throw new Error("current password invalid");
			}
		}),
	check("newPassword")
		.notEmpty()
		.withMessage("password required")
		.isLength({ min: 8 })
		.withMessage("password length must be 8 chars")
		.custom(async (val: string, { req }) => {
			if (val !== req.body.confirmPassword) {
				throw new Error("passwords doesn't match");
			}
			return true;
		}),
	check("confirmPassword")
		.notEmpty()
		.withMessage("confirm password required")
		.isLength({ min: 8 })
		.withMessage("confirm password length must be 8 chars"),
	validatorMiddleware,
];
