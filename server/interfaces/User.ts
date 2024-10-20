import { Document, RootQuerySelector } from "mongoose";

export default interface User extends Document {
	name: string;
	email: string;
	phone: string;
	password: string;
	gender: string;
	role: string;
	dateOfBirth: Date;
	appointments: any[];
	passwordChangedAt: Date | number;
	resetCode: string | undefined;
	resetCodeExpireTime: Date | number | undefined;
	resetCodeVerify: boolean | undefined;
}
