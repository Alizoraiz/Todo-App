"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const TYPES = {
    TodoRepository: Symbol.for('TodoRepository'),
    UserRepository: Symbol.for('UserRepository'),
    AuthInfrastructureService: Symbol.for('AuthInfrastructureService'),
    AuthService: Symbol.for('AuthService'),
    TodosService: Symbol.for('TodoService'),
    UsersService: Symbol.for('UserService'),
};
exports.default = TYPES;
