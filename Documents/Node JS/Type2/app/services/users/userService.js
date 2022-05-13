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
const UserEntity_1 = __importDefault(require("../../../domain/user/UserEntity"));
const UserStore_1 = __importDefault(require("../../../stores/UserStore"));
const paginationOptions_1 = __importDefault(require("../utils/pagination/paginationOptions"));
const customError_1 = __importDefault(require("../../../stores/exceptions/customError"));
const loggerService_1 = __importDefault(require("../../../http/utlis/loggerService"));
class UserService {
}
_a = UserService;
//Create User
UserService.addUser = (username, password, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!username || !email || !password) {
            throw new customError_1.default(400, 'Must provide values for username, email & password');
        }
        const userEntity = UserEntity_1.default.createFromDetails(username, password, email);
        return yield UserStore_1.default.add(userEntity);
    }
    catch (error) {
        throw new customError_1.default(400, error.message);
    }
});
//Get All User's
UserService.getAllUsers = (page, perPage) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pagination = new paginationOptions_1.default(page, perPage);
        let users = yield UserStore_1.default.findAllUsers(pagination);
        return users;
    }
    catch (error) {
        throw new customError_1.default(400, error.message);
    }
});
//Get Single User
UserService.getOneUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield UserStore_1.default.findByUserId(userId);
        return user;
    }
    catch (error) {
        loggerService_1.default.warn(error.message);
        throw new customError_1.default(400, error.message);
    }
});
//Update User
UserService.updateUser = (userId, username, password, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userUpdateObj = { userId: userId, username: username, password: password, email: email };
        const userEntity = UserEntity_1.default.createFromObj(userUpdateObj);
        const user = yield UserStore_1.default.update(userEntity);
        if (!user[0]) {
            throw new customError_1.default(400, 'User not found');
        }
        return user;
    }
    catch (error) {
        throw new customError_1.default(400, error.message);
    }
});
//Delete User
UserService.deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield UserStore_1.default.remove(userId);
        if (!user) {
            throw new customError_1.default(400, 'Unable to delete, Todo ID does not exist');
        }
        return user;
    }
    catch (error) {
        throw new customError_1.default(400, error.message);
    }
});
exports.default = UserService;
