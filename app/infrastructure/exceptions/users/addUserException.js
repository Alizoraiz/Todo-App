"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AddUserException extends Error {
    constructor(statusCode, message) {
        super(message);
        this.name = 'Add User Exception';
        this.statusCode = statusCode;
        Error.captureStackTrace(this, AddUserException);
    }
}
exports.default = AddUserException;
