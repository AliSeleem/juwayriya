"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../controllers/User");
const User_2 = require("../validators/User");
const Auth_1 = require("../controllers/Auth");
const User = (0, express_1.Router)();
User.use(Auth_1.protectRoutes);
// Users routes
User.get("/me", User_1.setLoggedUserId, User_1.getUser);
User.put("/changePassword", User_2.updateUserPasswordValidator, User_1.updatePassword);
User.put("/update", User_2.updateUserValidator, User_1.updateUserDetails);
User.get("/deleteMe", User_1.setLoggedUserId, User_1.deleteUser);
// Admins routes
User.use((0, Auth_1.allowedTo)("admin"));
User.route("/").get(User_1.getUsers).post(User_2.createUserValidator, User_1.createUser);
User.route("/:userId")
    .get(User_1.getUser)
    .patch(User_2.updateUserValidator, User_1.updateUser)
    .delete(User_1.deleteUser);
exports.default = User;
