"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AddTodoException extends Error {
    constructor(statusCode, message) {
        super(message);
        this.name = 'AddTodoException';
        this.statusCode = statusCode;
        Error.captureStackTrace(this, AddTodoException);
    }
}
exports.default = AddTodoException;
