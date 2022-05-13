"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todoController_1 = __importDefault(require("../controllers/todoController"));
const todoRouter = require('express').Router();
todoRouter.post('/addTodo', todoController_1.default.addTodo);
todoRouter.get('/allTodos', todoController_1.default.getAllTodo);
todoRouter.get('/:id', todoController_1.default.getOneTodo);
todoRouter.put('/:id', todoController_1.default.updateTodo);
todoRouter.delete('/:id', todoController_1.default.deleteTodo);
exports.default = todoRouter;
