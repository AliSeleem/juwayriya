"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define a sub-schema for the Item type
const ItemSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    price: { type: Number, required: true },
});
// Define the main Bill schema
const BillSchema = new mongoose_1.Schema({
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
    appointment: { type: mongoose_1.Schema.Types.ObjectId, ref: "appointments" },
    items: [ItemSchema],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Bill", BillSchema);
