"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const clientOptions = {
    serverApi: { version: "1", strict: true, deprecationErrors: true },
};
// database connection
const DBInit = () => {
    mongoose_1.default.connect(process.env.DB, clientOptions).then(() => {
        console.log(`Database connected to : ${process.env.DB}`);
    });
};
exports.default = DBInit;
