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
const TodoEntity_1 = __importDefault(require("../domain/todo/TodoEntity"));
const sequelize_1 = __importDefault(require("sequelize"));
const mysqlConnection_1 = __importDefault(require("../config/mysqlConnection"));
const TodoModel = mysqlConnection_1.default.define("todo", {
    TodoId: {
        type: sequelize_1.default.DataTypes.UUID,
        defaultValue: sequelize_1.default.DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.default.DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: sequelize_1.default.DataTypes.INTEGER
    },
    description: {
        type: sequelize_1.default.DataTypes.STRING
    }
});
class TodoStore {
    static add(todoEntity) {
        return __awaiter(this, void 0, void 0, function* () {
            const todoObj = yield TodoModel.create(todoEntity);
            return TodoEntity_1.default.createFromObj(todoObj);
        });
    }
    static findByTodoId(todoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield TodoModel.findOne({ where: { todoId } });
            return TodoEntity_1.default.createFromObj(todo);
        });
    }
    static findAllTodos() {
        return __awaiter(this, void 0, void 0, function* () {
            const todoObjs = yield TodoModel.findAll();
            return todoObjs.map((todoObj) => TodoEntity_1.default.createFromObj(todoObj));
        });
    }
    static remove(todoEntity) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TodoModel.destroy({ where: { todoId: todoEntity.todoId } });
        });
    }
    static update(todoEntity) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TodoModel.update(todoEntity, { where: { todoId: todoEntity.todoId } });
        });
    }
}
exports.default = TodoStore;
