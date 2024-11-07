import { jwtDecode } from "jwt-decode";

export const getUserAppointments = async (): Promise<any[]> => {
	const res = await fetch(
		"https://juwayria.vercel.app/api/appointment/userAppointments",
		{
			method: "GET",
			headers: {
				authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		}
	);
	const result = await res.json();
	const appointments = result.data;
	return appointments;
};

export const MakeAppointment = async (date: Date[], Iuser?: string) => {
	let user;
	if (!Iuser) {
		const token = localStorage.getItem("token");
		const decoded: any = token ? jwtDecode(token) : null;
		user = decoded._id;
	}
	const res = await fetch("https://juwayria.vercel.app/api/appointment/", {
		method: "POST",
		body: JSON.stringify({
			user,
			date,
		}),
		headers: {
			"Content-Type": "application/json",
			authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
	const result = await res.json();
	console.log(result);
	return result;
};

export const cancelAppointment = async (id: string) => {
	const token = localStorage.getItem("token");
	const user: any = jwtDecode(token!);
	const api = `https://juwayria.vercel.app/api/appointment/${id}/cancel`;
	console.log(api, user);
	const res = await fetch(api, {
		method: "PATCH",
		body: JSON.stringify({
			user: user._id,
		}),
		headers: {
			"Content-Type": "application/json",
			authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
	const result = await res.json();
	console.log(result);
	return result;
};
