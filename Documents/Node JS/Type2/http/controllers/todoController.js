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
const TodoEntity_1 = __importDefault(require("../../domain/todo/TodoEntity"));
const TodoStore_1 = __importDefault(require("../../stores/TodoStore"));
//Create TODO
const addTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todoEntity = TodoEntity_1.default.createFromDetails(req.body.name, req.body.price, req.body.description);
    const todo = yield TodoStore_1.default.add(todoEntity);
    res.status(200).send(todo);
});
//Get All TODO's
const getAllTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let todos = yield TodoStore_1.default.findAllTodos();
    res.status(200).send(todos);
});
//Get Single Todo
const getOneTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    let todo = yield TodoStore_1.default.findByTodoId(id);
    if (todo)
        res.status(200).send(todo);
    else
        res.status(404).send("Todo not found");
});
//Update Todo
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.todoId = req.params.id;
    const todoEntity = TodoEntity_1.default.createFromObj(req.body);
    const todo = yield TodoStore_1.default.update(todoEntity);
    if (todo[0] === 1)
        res.status(200).send("Todo has been updated");
    else
        res.send("Error, Todo not Updated");
});
//Delete Product
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.todoId = req.params.id;
    const todoEntity = TodoEntity_1.default.createFromObj(req.body);
    yield TodoStore_1.default.remove(todoEntity);
    res.status(200).send("Todo has been deleted");
});
exports.default = { addTodo, getAllTodo, getOneTodo, updateTodo, deleteTodo };
