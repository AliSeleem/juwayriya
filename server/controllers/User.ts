import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/User";
import ApiError from "../utils/ApiError";
import bcrypt from "bcryptjs";

// Simple CRUD operations -> for admins
export const createUser = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const user = await User.create(req.body);
		if (!user) {
			return next(new ApiError("Can't create user", 500));
		}
		res.status(201).json({ msg: " User created successfully", data: user });
	}
);

export const getUser = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const user = await User.findById(req.params.userId);
		if (!user) {
			return next(new ApiError("Can't find user", 404));
		}
		res.status(200).json({ msg: " User found successfully", data: user });
	}
);

export const getUsers = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const users = await User.find();
		if (!users) {
			return next(new ApiError("Can't find users", 404));
		}
		res.status(200).json({
			msg: " Users found successfully",
			data: users,
			length: users.length,
		});
	}
);

export const deleteUser = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			await User.findByIdAndDelete(req.params.userId);
			res.status(200).json({ msg: "User deleted successfully" });
		} catch (error) {
			return next(new ApiError("Can't delete user", 404));
		}
	}
);

// Update user -> for admins
export const updateUser = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
			new: true,
		});
		if (!user) {
			return next(new ApiError("Can't find user", 404));
		}
		res.status(200).json({ msg: " User updated successfully", data: user });
	}
);

// Set logged user id
export const setLoggedUserId = asyncHandler(
	(req: Request, res: Response, next: NextFunction) => {
		req.params.userId = req.user?._id!.toString();
		next();
	}
);

// update password-> for users
export const updatePassword = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const user = await User.findById(req.user?._id);
		if (!user) {
			return next(new ApiError("Can't find user", 404));
		}
		const isValidPassword = await bcrypt.compare(
			req.body.oldPassword,
			user.password
		);
		if (!isValidPassword) {
			return next(new ApiError("Invalid old password", 400));
		}
		const hashedPassword = await bcrypt.hash(req.body.newPassword, 12);
		user.password = hashedPassword;
		await user.save();
		res.status(200).json({ msg: "Password updated successfully" });
	}
);

// Update user (name, phone, email, dateOfBirth, gender) -> for users
export const updateUserDetails = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const user = await User.findById(req.user?._id!);
		if (!user) {
			return next(new ApiError("Can't find user", 404));
		}
		const { name, phone, email, dateOfBirth, gender } = req.body;
		user.name = name ? name : user.name;
		user.phone = phone ? phone : user.phone;
		user.email = email ? email : user.email;
		user.dateOfBirth = dateOfBirth ? dateOfBirth : user.dateOfBirth;
		user.gender = gender ? gender : user.gender;
		await user.save();
		res.status(200).json({ msg: "User details updated successfully" });
	}
);
