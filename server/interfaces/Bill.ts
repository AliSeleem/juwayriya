import { Document, Schema } from "mongoose";
import Appointment from "./Appointment";

export type Item = {
	name: string;
	amount: number;
	price: number;
};

export default interface Bill extends Document {
	type: string;
	amount: number;
	description: string;
	date: Date;
	status: string;
	appointment?: Schema.Types.ObjectId;
	items?: Item[];
}
