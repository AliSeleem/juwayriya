import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Clinic from "../models/Clinic";
import ApiError from "../utils/ApiError";

// Get data --> for visitors and admin
export const getClincData = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const clinic = await Clinic.findById("670e5bc0c555cb5690a02c42");
		if (!clinic) {
			return next(new ApiError("clinic not found", 404));
		}
		res.status(200).json({ msg: "Data retrieved successfully", data: clinic });
	}
);

// Update data --> for admin
export const updateClincData = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const clinic = await Clinic.findByIdAndUpdate(
			"670e5bc0c555cb5690a02c42",
			req.body,
			{
				new: true,
			}
		);
		if (!clinic) {
			return next(new ApiError("clinic not found", 404));
		}
		res.status(200).json({ msg: "Data updated successfully", data: clinic });
	}
);

// Get therapist availability --> for patients
export const getTherapistAvailability = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const clinic = await Clinic.findById("670e5bc0c555cb5690a02c42");
		if (!clinic) {
			return next(new ApiError("clinic not found", 404));
		}
		res.status(200).json({
			msg: "Availability returned successfully",
			data: { available: clinic.therapistAvailability },
		});
	}
);

// Toggle therapist availability --> for admin
export const toggleTherapistAvailability = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const clinic = await Clinic.findByIdAndUpdate(
			"670e5bc0c555cb5690a02c42",
			{
				therapistAvailability: req.body.therapistAvailability,
			},
			{ new: true }
		);
		if (!clinic) {
			return next(new ApiError("clinic not found", 404));
		}
		res.status(200).json({
			msg: "Availability updated successfully",
			data: { available: clinic.therapistAvailability },
		});
	}
);
