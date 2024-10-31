import * as all from "../interfaces/index";
import { Application, NextFunction, Request, Response } from "express";
import Clinic from "./Clinic";
import User from "./User";
import Auth from "./Auth";
import ApiError from "../utils/ApiError";
import globalErrors from "../middleware/globalErrors";
import Appointment from "./Appointment";
import Bill from "./Bill";

export const MountRoutes = (app: Application) => {
	// Routers
	app.use("/api/clinic", Clinic); // http://localhost:5000//api/clinic
	app.use("/api/user", User);
	app.use("/api/auth", Auth);
	app.use("/api/appointment", Appointment);
	app.use("/api/bill", Bill);

	// Not found handler
	app.all("**", (req: Request, res: Response, next: NextFunction) => {
		{
			next(new ApiError(`the router ${req.originalUrl} is not found`, 400));
		}
	});
	app.use(globalErrors);
};
