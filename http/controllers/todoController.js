"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todoService_1 = __importDefault(require("../../app/application/todos/todoService"));
const errorHandler_1 = __importDefault(require("../utlis/errorHandler"));
const loggerService_1 = __importDefault(require("../utlis/loggerService"));
require("reflect-metadata");
const inversify_1 = require("inversify");
const types_1 = __importDefault(require("../../app/domain/types/types"));
//myContainer.get(TodoService)
//Create TODO
let TodoController = class TodoController {
    constructor(todoService) {
        this.addTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { body: { name, price, description } } = req;
            console.log('here', name);
            try {
                const response = yield this.todoService.addTodo(name, price, description);
                res.status(200).send(response);
            }
            catch (err) {
                loggerService_1.default.error(err.message);
                return (0, errorHandler_1.default)(err, res);
            }
        });
        //Get All TODO's
        this.getAllTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { query: { page, perPage } } = req;
            try {
                const response = yield todoService_1.default.getAllTodos(page, perPage);
                res.status(200).send(response);
            }
            catch (err) {
                loggerService_1.default.error(err.message);
                return (0, errorHandler_1.default)(err, res);
            }
        });
        //Get Single Todo
        this.getOneTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { params: { id } } = req;
            try {
                const response = yield todoService_1.default.getOneTodo(id);
                res.status(200).send(response);
            }
            catch (err) {
                loggerService_1.default.error(err.message);
                return (0, errorHandler_1.default)(err, res);
            }
        });
        //Update Todo
        this.updateTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { params: { id } } = req;
            const { name, price, description } = req.body;
            try {
                const response = yield todoService_1.default.updateTodo(id, name, price, description);
                return res.status(200).send(response);
            }
            catch (err) {
                loggerService_1.default.error(err.message);
                return (0, errorHandler_1.default)(err, res);
            }
        });
        //Delete Todo
        this.deleteTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { params: { id } } = req;
            try {
                const response = yield todoService_1.default.deleteTodo(id);
                res.status(200).send(response);
            }
            catch (err) {
                loggerService_1.default.error(err.message);
                return (0, errorHandler_1.default)(err, res);
            }
        });
        this.todoService = todoService;
    }
};
TodoController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.default.TodosService))
], TodoController);
exports.default = TodoController;
