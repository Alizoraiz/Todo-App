"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todoController_1 = __importDefault(require("../controllers/todoController"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const inversifyConfig_1 = __importDefault(require("../../app/infrastructure/config/inversifyConfig"));
const todoRouter = require('express').Router();
const todoController = inversifyConfig_1.default.get(todoController_1.default);
todoRouter.post('/addTodo', auth_1.default.authenticate, todoController.addTodo);
todoRouter.get('/allTodos', auth_1.default.authenticate, todoController.getAllTodo);
todoRouter.get('/:id', auth_1.default.authenticate, todoController.getOneTodo);
todoRouter.put('/:id', auth_1.default.authenticate, todoController.updateTodo);
todoRouter.delete('/:id', auth_1.default.authenticate, todoController.deleteTodo);
exports.default = todoRouter;
