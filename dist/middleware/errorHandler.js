"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.AppError = void 0;
const logger_1 = require("../utils/logger");
// Custom error handling middleware giving more information about errors
class AppError extends Error {
    // Constructor for the AppError class
    constructor(message, statusCode) {
        super(message); // Call the parent class (Error) constructor with the message
        this.statusCode = statusCode; // Set the HTTP status code
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"; // Determine if it's a client or server error
        this.isOperational = true; // Mark this error as operational (trusted)
        Error.captureStackTrace(this, this.constructor); // Capture the stack trace for debugging
    }
}
exports.AppError = AppError;
const errorHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
    logger_1.logger.error("Unexpected error:", err); // Log unexpected errors for debugging
    // For unexpected errors, send a generic message
    return res.status(500).json({
        status: "error",
        message: "Something went wrong!",
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map