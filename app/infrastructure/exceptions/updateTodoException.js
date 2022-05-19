"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UpdateTodoException extends Error {
    constructor(statusCode, message) {
        super(message);
        this.name = 'Update Todo Exception ';
        this.statusCode = statusCode;
        Error.captureStackTrace(this, UpdateTodoException);
    }
}
exports.default = UpdateTodoException;
