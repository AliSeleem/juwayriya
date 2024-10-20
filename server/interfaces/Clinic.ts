import { Document } from "mongoose";

export default interface Clinic extends Document {
	name: string;
	summary: string;
	img?: string;
	address: string[];
	contact: string[];
	openHours: string;
	therapistAvailability: boolean;
}
