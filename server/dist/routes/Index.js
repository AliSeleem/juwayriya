"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MountRoutes = void 0;
const Clinic_1 = __importDefault(require("./Clinic"));
const User_1 = __importDefault(require("./User"));
const Auth_1 = __importDefault(require("./Auth"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const globalErrors_1 = __importDefault(require("../middleware/globalErrors"));
const Appointment_1 = __importDefault(require("./Appointment"));
const Bill_1 = __importDefault(require("./Bill"));
const MountRoutes = (app) => {
    // Routers
    app.use("/api/clinic", Clinic_1.default); // http://localhost:5000//api/clinic
    app.use("/api/user", User_1.default);
    app.use("/api/auth", Auth_1.default);
    app.use("/api/appointment", Appointment_1.default);
    app.use("/api/bill", Bill_1.default);
    // Not found handler
    app.all("**", (req, res, next) => {
        {
            next(new ApiError_1.default(`the router ${req.originalUrl} is not found`, 400));
        }
    });
    app.use(globalErrors_1.default);
};
exports.MountRoutes = MountRoutes;
