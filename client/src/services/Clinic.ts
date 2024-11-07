export const isDoctorAvailable = async (): Promise<boolean> => {
	const res = await fetch("https://juwayria.vercel.app/api/clinic/therapist");
	const result = await res.json();
	return result.data.available;
};
