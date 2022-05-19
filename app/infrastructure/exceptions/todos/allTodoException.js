"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AllTodoException extends Error {
    constructor(statusCode, message) {
        super(message);
        this.name = 'AllTodoException';
        this.statusCode = statusCode;
        Error.captureStackTrace(this, AllTodoException);
    }
}
exports.default = AllTodoException;
