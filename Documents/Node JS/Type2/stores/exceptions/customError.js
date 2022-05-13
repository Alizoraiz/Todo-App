"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.name = 'CustomError';
        this.statusCode = statusCode;
        Error.captureStackTrace(this, CustomError);
    }
}
exports.default = CustomError;
