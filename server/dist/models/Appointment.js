"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AppointmentSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "user" },
    date: [{ type: Date, required: true }],
    status: {
        type: String,
        enum: ["Pendding", "Done", "Accepted"],
        default: "Pendding",
    },
    notes: String,
    feedback: String,
}, { timestamps: true });
// AppointmentSchema.pre<Appointment>(/^find/, function (next) {
// 	this.populate({
// 		path: "user",
// 		select: "name phone",
// 	});
// });
exports.default = (0, mongoose_1.model)("appointments", AppointmentSchema);
