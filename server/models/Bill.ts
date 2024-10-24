import { model, Schema } from "mongoose";
import Bill, { Item } from "../interfaces/Bill";

// Define a sub-schema for the Item type
const ItemSchema: Schema = new Schema<Item>({
	name: { type: String, required: true },
	amount: { type: Number, required: true },
	price: { type: Number, required: true },
});

// Define the main Bill schema
const BillSchema: Schema = new Schema<Bill>(
	{
		type: { type: String, required: true, enum: ["income", "outcome"] },
		amount: { type: Number, required: true },
		description: { type: String, required: true },
		date: { type: Date, required: true },
		status: {
			type: String,
			required: true,
			enum: ["Paid", "Pendding"],
			default: "Pendding",
		},
		appointment: { type: Schema.Types.ObjectId, ref: "appointments" },
		items: [ItemSchema],
	},
	{ timestamps: true }
);

export default model<Bill>("Bill", BillSchema);
