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
const UserEntity_1 = __importDefault(require("../../domain/user/UserEntity"));
const paginationOptions_1 = __importDefault(require("../../services/utils/pagination/paginationOptions"));
const loggerService_1 = __importDefault(require("../../../http/utlis/loggerService"));
const UserRepositry_1 = __importDefault(require("../../infrastructure/mysqlrepositories/repositries/UserRepositry"));
const addUserException_1 = __importDefault(require("../../infrastructure/exceptions/users/addUserException"));
const allUserException_1 = __importDefault(require("../../infrastructure/exceptions/users/allUserException"));
const singleUserException_1 = __importDefault(require("../../infrastructure/exceptions/users/singleUserException"));
const updateUserException_1 = __importDefault(require("../../infrastructure/exceptions/users/updateUserException"));
const deleteUserException_1 = __importDefault(require("../../infrastructure/exceptions/users/deleteUserException"));
class UserService {
}
_a = UserService;
//Create User
UserService.addUser = (username, password, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!username || !email || !password) {
            throw new addUserException_1.default(400, 'Must provide values for username, email & password');
        }
        const userEntity = UserEntity_1.default.createFromDetails(username, password, email);
        return yield UserRepositry_1.default.add(userEntity);
    }
    catch (error) {
        loggerService_1.default.error(error.message);
        throw new addUserException_1.default(400, error.message);
    }
});
//Get All User's
UserService.getAllUsers = (page, perPage) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pagination = new paginationOptions_1.default(page, perPage);
        let users = yield UserRepositry_1.default.findAllUsers(pagination);
        return users;
    }
    catch (error) {
        loggerService_1.default.error(error.message);
        throw new allUserException_1.default(400, error.message);
    }
});
//Get Single User
UserService.getOneUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield UserRepositry_1.default.findByUserId(userId);
        return user;
    }
    catch (error) {
        loggerService_1.default.error(error.message);
        throw new singleUserException_1.default(400, error.message);
    }
});
//Update User
UserService.updateUser = (userId, username, password, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userUpdateObj = { userId: userId, username: username, password: password, email: email };
        const userEntity = UserEntity_1.default.createFromObj(userUpdateObj);
        const user = yield UserRepositry_1.default.update(userEntity);
        if (!user[0]) {
            throw new updateUserException_1.default(400, 'User not found');
        }
        return { message: 'Successfully updated' };
    }
    catch (error) {
        loggerService_1.default.error(error.message);
        throw new updateUserException_1.default(400, error.message);
    }
});
//Delete User
UserService.deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield UserRepositry_1.default.remove(userId);
        if (!user) {
            throw new deleteUserException_1.default(400, 'Unable to delete, Todo ID does not exist');
        }
        return { message: 'Successfully deleted' };
    }
    catch (error) {
        loggerService_1.default.error(error.message);
        throw new deleteUserException_1.default(400, error.message);
    }
});
exports.default = UserService;
