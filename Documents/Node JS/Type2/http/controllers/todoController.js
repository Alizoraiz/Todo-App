"use strict";
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
const todoService_1 = __importDefault(require("../../app/services/todos/todoService"));
const errorHandler_1 = __importDefault(require("../utlis/errorHandler"));
const loggerService_1 = __importDefault(require("../utlis/loggerService"));
//Create TODO
const addTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body: { name, price, description } } = req;
    try {
        const response = yield todoService_1.default.addTodo(name, price, description);
        res.status(200).send(response);
    }
    catch (err) {
        loggerService_1.default.warn(err.message);
        return (0, errorHandler_1.default)(err, res);
    }
});
//Get All TODO's
const getAllTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, perPage } = req.query;
    try {
        const response = yield todoService_1.default.getAllTodos(page, perPage);
        res.status(200).send(response);
    }
    catch (err) {
        loggerService_1.default.warn(err.message);
        return (0, errorHandler_1.default)(err, res);
    }
});
//Get Single Todo
const getOneTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const response = yield todoService_1.default.getOneTodo(id);
        res.status(200).send(response);
    }
    catch (err) {
        loggerService_1.default.warn(err.message);
        return (0, errorHandler_1.default)(err, res);
    }
});
//Update Todo
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, price, description } = req.body;
    try {
        const response = yield todoService_1.default.updateTodo(id, name, price, description);
        return res.status(200).send(response);
    }
    catch (err) {
        loggerService_1.default.warn(err.message);
        return (0, errorHandler_1.default)(err, res);
    }
});
//Delete Todo
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const response = yield todoService_1.default.deleteTodo(id);
        res.status(200).send({ message: 'Successfully deleted' });
    }
    catch (err) {
        loggerService_1.default.warn(err.message);
        return (0, errorHandler_1.default)(err, res);
    }
});
exports.default = { addTodo, getAllTodo, getOneTodo, updateTodo, deleteTodo };
