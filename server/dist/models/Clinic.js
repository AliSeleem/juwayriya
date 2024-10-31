"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cliniSchema = new mongoose_1.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 15 },
    summary: { type: String, required: true, minlength: 10, maxlength: 50 },
    img: String,
    address: [{ type: String, required: true }],
    contact: [{ type: String, required: true, length: 11 }],
    openHours: { type: String, required: true },
    therapistAvailability: { type: Boolean, required: true },
});
exports.default = (0, mongoose_1.model)("clinic", cliniSchema);
