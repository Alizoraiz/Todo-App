"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const TodoEntity_1 = __importDefault(require("../../../domain/todo/TodoEntity"));
const sequelize_1 = __importDefault(require("sequelize"));
const mysqlConnection_1 = __importDefault(require("../../../../config/mysqlConnection"));
const paginationCollection_1 = __importDefault(require("../../../services/utils/pagination/paginationCollection"));
const loggerService_1 = __importDefault(require("../../../../http/utlis/loggerService"));
const customError_1 = __importDefault(require("./exceptions/customError"));
const inversify_1 = require("inversify");
require("reflect-metadata");
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
let TodoRepositry = class TodoRepositry {
    add(todoEntity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const todoObj = yield TodoModel.create(todoEntity);
                return TodoEntity_1.default.createFromObj(todoObj);
            }
            catch (error) {
                loggerService_1.default.error(error.message);
                throw new customError_1.default(400, error.message);
            }
        });
    }
    static findByTodoId(TodoId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const todo = yield TodoModel.findOne({ where: { TodoId }, raw: true });
                if (!todo) {
                    throw new customError_1.default(400, 'Todo not found,Todo ID unavailable ');
                }
                else {
                    return TodoEntity_1.default.createFromObj(todo);
                }
            }
            catch (error) {
                loggerService_1.default.error(error.message);
                throw new customError_1.default(400, error.message);
            }
        });
    }
    static findAllTodos(pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const todoObjs = yield TodoModel.findAndCountAll({
                    limit: pagination.limit(),
                    offset: pagination.offset()
                });
                const todosCollection = todoObjs.rows.map((todoObj) => TodoEntity_1.default.createFromObj(todoObj));
                const paginatedCollection = new paginationCollection_1.default(pagination, todoObjs.count, todosCollection);
                return paginatedCollection.getPaginatedData();
            }
            catch (error) {
                loggerService_1.default.error(error.message);
                throw new customError_1.default(400, error.message);
            }
        });
    }
    static remove(todoId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield TodoModel.destroy({ where: { TodoId: todoId } });
            }
            catch (error) {
                loggerService_1.default.error(error.message);
                throw new customError_1.default(400, error.message);
            }
        });
    }
    static update(todoEntity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield TodoModel.update(todoEntity, { where: { TodoId: todoEntity.todoId } });
            }
            catch (error) {
                loggerService_1.default.error(error.message);
                throw new customError_1.default(400, error.message);
            }
        });
    }
};
TodoRepositry = __decorate([
    (0, inversify_1.injectable)()
], TodoRepositry);
exports.default = TodoRepositry;
