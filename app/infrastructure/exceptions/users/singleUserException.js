"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SingleUserException extends Error {
    constructor(statusCode, message) {
        super(message);
        this.name = 'Single User Exception';
        this.statusCode = statusCode;
        Error.captureStackTrace(this, SingleUserException);
    }
}
exports.default = SingleUserException;
