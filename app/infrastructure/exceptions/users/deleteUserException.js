"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DeleteUserException extends Error {
    constructor(statusCode, message) {
        super(message);
        this.name = 'Delete User Exception';
        this.statusCode = statusCode;
        Error.captureStackTrace(this, DeleteUserException);
    }
}
exports.default = DeleteUserException;
