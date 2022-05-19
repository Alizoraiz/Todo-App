"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UpdateUserException extends Error {
    constructor(statusCode, message) {
        super(message);
        this.name = 'Update User Exception';
        this.statusCode = statusCode;
        Error.captureStackTrace(this, UpdateUserException);
    }
}
exports.default = UpdateUserException;
