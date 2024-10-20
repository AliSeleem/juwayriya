import { model, Schema } from "mongoose";
import Clinic from "../interfaces/Clinic";

const cliniSchema: Schema = new Schema<Clinic>({
	name: { type: String, required: true, minlength: 3, maxlength: 15 },
	summary: { type: String, required: true, minlength: 10, maxlength: 50 },
	img: String,
	address: [{ type: String, required: true }],
	contact: [{ type: String, required: true, length: 11 }],
	openHours: { type: String, required: true },
	therapistAvailability: { type: Boolean, required: true },
});

export default model<Clinic>("clinic", cliniSchema);
