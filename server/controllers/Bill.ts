import { NextFunction, Request, Response } from "express";
import asynchandler from "express-async-handler";
import Bill from "../models/Bill";
import ApiError from "../utils/ApiError";

// Make bill
export const makeBill = asynchandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const bill = await Bill.create(req.body);
		if (!bill) {
			return next(new ApiError("Can not make bill", 500));
		}
		res.status(201).json({ msg: "Bill made successfully", data: bill });
	}
);

// Get bills
export const getBills = asynchandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const bills = await Bill.find();
		if (!bills) {
			return next(new ApiError("Can not get bills", 500));
		}
		res.status(200).json({ msg: "Bills retrieved successfully", length: bills.length, data: bills });
	}
);

// Set bill as paid
export const setBillAsPaid = asynchandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const bill = await Bill.findByIdAndUpdate(
			req.params.id,
			{ status: "Paid" },
			{ new: true }
		);
		if (!bill) {
			return next(new ApiError("Can not find bill", 500));
		}
		res.status(200).json({ msg: "Bill paid successfully", data: bill });
	}
);

// Delete bill
export const deleteBill = asynchandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const bill = await Bill.findByIdAndDelete(req.params.id);
		if (!bill) {
			return next(new ApiError("Can not find bill", 500));
		}
		res.status(200).json({ msg: "Bill deleted successfully" });
	}
);
