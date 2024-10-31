"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrors = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "Error";
    if (process.env.NODE_ENV === "development") {
        res.status(err.statusCode).json({
            error: err,
            message: err.message,
            stack: err.stack,
        });
    }
    else {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
};
exports.default = globalErrors;
