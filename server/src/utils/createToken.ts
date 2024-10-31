import Jwt from "jsonwebtoken";

export const createToken = (payload: any, role: string) =>
	Jwt.sign({ _id: payload, role: role }, process.env.JWT_SECRET_KEY!, {
		expiresIn: process.env.JWT_EXPIRED_TIME,
	});

export const createResetToken = (payload: any, role: string) =>
	Jwt.sign({ _id: payload, role: role }, process.env.JWT_SECRET_KEY!, {
		expiresIn: process.env.JWT_RESET_EXPIRED_TIME,
	});
