"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
require("reflect-metadata");
//import AuthTokenService from '../../../';
const types_1 = __importDefault(require("../../domain/types/types"));
const myContainer = new inversify_1.Container();
myContainer.bind(types_1.default.TodoRepository).toSelf();
myContainer.bind(types_1.default.UserRepository).toSelf();
myContainer.bind(types_1.default.AuthService).toSelf();
myContainer.bind(types_1.default.UsersService).toSelf();
myContainer.bind(types_1.default.TodosService).toSelf();
exports.default = myContainer;
