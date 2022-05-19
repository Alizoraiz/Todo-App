"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DeleteTodoException extends Error {
    constructor(statusCode, message) {
        super(message);
        this.name = 'Delete Todo Exception ';
        this.statusCode = statusCode;
        Error.captureStackTrace(this, DeleteTodoException);
    }
}
exports.default = DeleteTodoException;
