class ApiError extends Error {
	private status: string;
	constructor(message: string, private statusCode: number) {
		super(message);
		this.status = this.statusCode % 400 < 99 ? "failed" : "error";
	}
}

export default ApiError;
