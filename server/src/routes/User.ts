import { NextFunction, Request, Response, Router } from "express";
import {
	createUser,
	deleteUser,
	getUser,
	getUsers,
	setLoggedUserId,
	updatePassword,
	updateUser,
	updateUserDetails,
} from "../controllers/User";
import {
	createUserValidator,
	updateUserPasswordValidator,
	updateUserValidator,
} from "../validators/User";
import { allowedTo, protectRoutes } from "../controllers/Auth";

const User = Router();

User.use(protectRoutes);

// Users routes
User.get("/me", setLoggedUserId, getUser);
User.put("/changePassword", updateUserPasswordValidator, updatePassword);
User.put("/update", updateUserValidator, updateUserDetails);
User.delete("/deleteMe", setLoggedUserId, deleteUser);

// Admins routes
User.use(allowedTo("admin"));

User.route("/").get(getUsers).post(createUserValidator, createUser);

User.route("/:userId")
	.get(getUser)
	.patch(updateUserValidator, updateUser)
	.delete(deleteUser);

export default User;
