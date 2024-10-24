import { model, Schema } from "mongoose";
import Appointment from "../interfaces/Appointment";

const AppointmentSchema: Schema = new Schema<Appointment>(
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

// AppointmentSchema.pre<Appointment>(/^find/, function (next) {
// 	this.populate({
// 		path: "user",
// 		select: "name phone",
// 	});
// });

export default model<Appointment>("appointments", AppointmentSchema);
