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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const TodoEntity_1 = __importDefault(require("../../../domain/todo/TodoEntity"));
const TodoStore_1 = __importDefault(require("../../../stores/TodoStore"));
const paginationOptions_1 = __importDefault(require("../utils/pagination/paginationOptions"));
const customError_1 = __importDefault(require("../../../stores/exceptions/customError"));
class TodoService {
}
_a = TodoService;
//Create TODO
TodoService.addTodo = (name, price, description) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!name || !price || !description) {
            throw new customError_1.default(400, 'Please provide all values to create a Todo');
        }
        const todoEntity = TodoEntity_1.default.createFromDetails(name, price, description);
        return yield TodoStore_1.default.add(todoEntity);
    }
    catch (error) {
        throw new customError_1.default(400, error.message);
    }
});
//Get All TODO's
TodoService.getAllTodos = (page, perPage) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!page || !perPage) {
            throw new customError_1.default(400, 'Please provide Page & PerPage values');
        }
        const pagination = new paginationOptions_1.default(page, perPage);
        let todos = yield TodoStore_1.default.findAllTodos(pagination);
        return todos;
    }
    catch (error) {
        throw new customError_1.default(400, error.message);
    }
});
//Get Single TODO
TodoService.getOneTodo = (todoId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let todo = yield TodoStore_1.default.findByTodoId(todoId);
        if (!todo) {
            throw new customError_1.default(400, 'Todo not found');
        }
        return todo;
    }
    catch (error) {
        throw new customError_1.default(400, error.message);
    }
});
//Update TODO
TodoService.updateTodo = (todoId, name, price, description) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todoUpdateObj = { todoId: todoId, name: name, price: price, descrition: description };
        const todoEntity = TodoEntity_1.default.createFromObj(todoUpdateObj);
        const todo = yield TodoStore_1.default.update(todoEntity);
        if (!todo[0]) {
            throw new customError_1.default(400, 'Update Failed');
        }
        return { message: 'Successfully updated' };
    }
    catch (error) {
        throw new customError_1.default(400, error.message);
    }
});
//Delete TODO
TodoService.deleteTodo = (todoId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let todo = yield TodoStore_1.default.remove(todoId);
        if (!todo) {
            throw new customError_1.default(400, 'Unable to delete, Todo ID does not exist');
        }
        return todo;
    }
    catch (error) {
        throw new customError_1.default(400, error.message);
    }
});
exports.default = TodoService;
