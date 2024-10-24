import { Schema } from "mongoose";
import { Document } from "mongoose";

export default interface Appointment extends Document {
	user: Schema.Types.ObjectId;
	date: Date[];
	status: string;
	notes: string;
	feedback: string;
}
