import User from "./User";

declare module "express" {
	interface Request {
		user?: User;
	}
}
