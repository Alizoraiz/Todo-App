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
const TodoEntity_1 = __importDefault(require("../../domain/todo/TodoEntity"));
const paginationOptions_1 = __importDefault(require("../../services/utils/pagination/paginationOptions"));
const TodoRepositry_1 = __importDefault(require("../../infrastructure/mysqlrepositories/repositries/TodoRepositry"));
const loggerService_1 = __importDefault(require("../../../http/utlis/loggerService"));
const addTodoException_1 = __importDefault(require("../../infrastructure/exceptions/todos/addTodoException"));
const allTodoException_1 = __importDefault(require("../../infrastructure/exceptions/todos/allTodoException"));
const singleTodoException_1 = __importDefault(require("../../infrastructure/exceptions/todos/singleTodoException"));
const updateTodoException_1 = __importDefault(require("../../infrastructure/exceptions/todos/updateTodoException"));
const deleteTodoException_1 = __importDefault(require("../../infrastructure/exceptions/todos/deleteTodoException"));
const inversify_1 = require("inversify");
const types_1 = __importDefault(require("../../domain/types/types"));
require("reflect-metadata");
let TodoService = class TodoService {
    constructor(todoRepository) {
        //Create TODO
        this.addTodo = (name, price, description) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!name || !price || !description) {
                    throw new addTodoException_1.default(400, 'Please provide all values to create a Todo');
                }
                const todoEntity = TodoEntity_1.default.createFromDetails(name, price, description);
                return yield this.todoRepository.add(todoEntity);
            }
            catch (error) {
                loggerService_1.default.error(error.message);
                throw new addTodoException_1.default(400, error.message);
            }
        });
        this.todoRepository = todoRepository;
    }
};
//Get All TODO's
TodoService.getAllTodos = (page, perPage) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!page || !perPage) {
            throw new allTodoException_1.default(400, 'Please provide Page & PerPage values');
        }
        const pagination = new paginationOptions_1.default(page, perPage);
        let todos = yield TodoRepositry_1.default.findAllTodos(pagination);
        return todos;
    }
    catch (error) {
        loggerService_1.default.error(error.message);
        throw new allTodoException_1.default(400, error.message);
    }
});
//Get Single TODO
TodoService.getOneTodo = (todoId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let todo = yield TodoRepositry_1.default.findByTodoId(todoId);
        if (!todo) {
            throw new singleTodoException_1.default(400, 'Todo not found');
        }
        return todo;
    }
    catch (error) {
        loggerService_1.default.error(error.message);
        throw new singleTodoException_1.default(400, error.message);
    }
});
//Update TODO
TodoService.updateTodo = (todoId, name, price, description) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todoUpdateObj = { todoId: todoId, name: name, price: price, descrition: description };
        const todoEntity = TodoEntity_1.default.createFromObj(todoUpdateObj);
        const todo = yield TodoRepositry_1.default.update(todoEntity);
        if (!todo[0]) {
            throw new updateTodoException_1.default(400, 'Update Failed');
        }
        return { message: 'Successfully updated' };
    }
    catch (error) {
        loggerService_1.default.error(error.message);
        throw new updateTodoException_1.default(400, error.message);
    }
});
//Delete TODO
TodoService.deleteTodo = (todoId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let todo = yield TodoRepositry_1.default.remove(todoId);
        if (!todo) {
            throw new deleteTodoException_1.default(400, 'Unable to delete, Todo ID does not exist');
        }
        return { message: 'Successfully deleted' };
    }
    catch (error) {
        loggerService_1.default.error(error.message);
        throw new deleteTodoException_1.default(400, error.message);
    }
});
TodoService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.default.TodoRepository))
], TodoService);
exports.default = TodoService;
