import { Ilogin } from "@/pages/auth/Login";
import { Isignup } from "@/pages/auth/Signup";

export const Login = async (data: Ilogin) => {
	const res = await fetch("https://juwayria.vercel.app/api/auth/login", {
		method: "POST",
		body: JSON.stringify(data),
		headers: { "Content-Type": "application/json" },
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
