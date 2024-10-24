import { model, Schema } from "mongoose";
import User from "../interfaces/User";
import bcrypt from "bcryptjs";

const userSchema: Schema = new Schema<User>(
	{
		name: { type: String, required: true, minlength: 3, maxlength: 15 },
		phone: { type: String, required: true, length: 11 },
		email: { type: String, required: true },
		password: { type: String, required: true, minlength: 8 },
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
		gender: { type: String, required: true, enum: ["male", "female"] },
		dateOfBirth: { type: Date, required: true },
		appointments: [{ type: Schema.Types.ObjectId, ref: "appointments" }],
		passwordChangedAt: Date,
		resetCode: String,
		resetCodeExpireTime: Date,
		resetCodeVerify: Boolean,
	},
	{ timestamps: true }
);

// userSchema.pre<User>(/^find/, function (next) {
// 	this.populate({
// 		path: "appointments",
// 		select: "date duration status notes feedback",
// 	});
// });

userSchema.pre<User>("save", async function (next) {
	if (!this.isModified("password")) {
		return next;
	}
	this.password = await bcrypt.hash(this.password, 13);
});

export default model<User>("user", userSchema);
