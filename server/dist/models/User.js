"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.Schema({
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
    appointments: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "appointments" }],
    passwordChangedAt: Date,
    resetCode: String,
    resetCodeExpireTime: Date,
    resetCodeVerify: Boolean,
}, { timestamps: true });
// userSchema.pre<User>(/^find/, function (next) {
// 	this.populate({
// 		path: "appointments",
// 		select: "date duration status notes feedback",
// 	});
// });
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password")) {
            return next;
        }
        this.password = yield bcryptjs_1.default.hash(this.password, 13);
    });
});
exports.default = (0, mongoose_1.model)("user", userSchema);
