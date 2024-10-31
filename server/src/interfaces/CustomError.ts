export default interface CustomError extends Error {
	status?: string;
	statusCode?: number;
}
