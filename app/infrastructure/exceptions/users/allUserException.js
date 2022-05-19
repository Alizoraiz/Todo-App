"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AllUserException extends Error {
    constructor(statusCode, message) {
        super(message);
        this.name = 'All User Exception';
        this.statusCode = statusCode;
        Error.captureStackTrace(this, AllUserException);
    }
}
exports.default = AllUserException;
