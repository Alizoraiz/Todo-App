"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SingleTodoException extends Error {
    constructor(statusCode, message) {
        super(message);
        this.name = 'Single Todo Exception';
        this.statusCode = statusCode;
        Error.captureStackTrace(this, SingleTodoException);
    }
}
exports.default = SingleTodoException;
