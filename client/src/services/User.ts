import { IupdateMe } from "@/components/UpdateMe";
import { IupdatePassword } from "@/components/UpdatePassword";

export const getMe = async () => {
	const res = await fetch("https://juwayria.vercel.app/api/user/me", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
	const result = await res.json();
	console.log(result);
	return result;
};

export const updatePassword = async (data: IupdatePassword) => {
	const res = await fetch(
		"https://juwayria.vercel.app/api/user/changePassword",
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
			body: JSON.stringify(data),
		}
	);
	const result = await res.json();
	return result;
};

export const updateMe = async (data: IupdateMe) => {
	const res = await fetch("https://juwayria.vercel.app/api/user/update", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		body: JSON.stringify(data),
	});
	const result = await res.json();
	return result;
};

export const deleteMe = async () => {
	const res = await fetch("https://juwayria.vercel.app/api/user/deleteMe", {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
	const result = await res.json();
	return result;
};
