import { Request, Response, NextFunction, RequestHandler } from "express";
import { validationResult } from "express-validator";

const validatorMiddleware: RequestHandler = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	// Explicitly declare return type as void
	const errors = validationResult(req); // Use 'errors' instead of 'error' for clarity
	if (!errors.isEmpty()) {
		res.status(400).json({ errors: errors.array() });
		return; // Make sure to return after sending a response
	}
	next(); // Proceed to the next middleware if no validation errors
};

export default validatorMiddleware;
