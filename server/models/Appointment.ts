import { model, Schema } from "mongoose";
import Appointment from "../interfaces/Appointment";

const Appointment: Schema = new Schema<Appointment>(
	{
		user: { type: Schema.Types.ObjectId, required: true, ref: "user" },
		date: [{ type: Date, required: true }],
		status: {
			type: String,
			enum: ["Pendding", "Done", "Accepted"],
			default: "Pendding",
		},
		notes: String,
		feedback: String,
	},
	{ timestamps: true }
);

export default model<Appointment>("appointments", Appointment);
