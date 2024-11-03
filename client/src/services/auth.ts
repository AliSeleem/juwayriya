import { IforgetPassword } from "@/pages/auth/ForgetPassword";
import { Ilogin } from "@/pages/auth/Login";
import { IresetPassword } from "@/pages/auth/ResetPassword";
import { Isignup } from "@/pages/auth/Signup";
import { IresetCode } from "@/pages/auth/VerifyCode";
import { jwtDecode } from "jwt-decode";
import { NavigateFunction } from "react-router-dom";

export const Login = async (data: Ilogin) => {
	const res = await fetch("https://juwayria.vercel.app/api/auth/login", {
		method: "POST",
		body: JSON.stringify(data),
		headers: { "Content-Type": "application/json" },
	});
	const result = await res.json();
	return result;
};

export const forgetpassword = async (data: IforgetPassword) => {
	const res = await fetch(
		"https://juwayria.vercel.app/api/auth/forgetPassword",
		{
			method: "POST",
			body: JSON.stringify(data),
			headers: { "Content-Type": "application/json" },
		}
	);
	const result = await res.json();
	return result;
};

export const verifyCode = async (data: IresetCode) => {
	const res = await fetch("https://juwayria.vercel.app/api/auth/verifyCode", {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
			authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
	const result = await res.json();
	return result;
};

export const resetPassword = async (data: IresetPassword) => {
	const res = await fetch("https://juwayria.vercel.app/api/auth/resetCode", {
		method: "PUT",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
			authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
	const result = await res.json();
	return result;
};

export const signup = async (data: Isignup) => {
	const res = await fetch("https://juwayria.vercel.app/api/auth/signup", {
		method: "POST",
		body: JSON.stringify(data),
		headers: { "Content-Type": "application/json" },
	});
	const result = await res.json();
	return result;
};

export const checkAuth = (token: string, nav: NavigateFunction) => {
	const decoded: any = jwtDecode(token);
	if (decoded.role === "admin") {
		nav("/admin");
	} else if (decoded.role === "user") {
		nav("/patient");
	} else {
		nav("/");
	}
};
