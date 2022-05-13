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
const userService_1 = __importDefault(require("../../app/services/users/userService"));
const errorHandler_1 = __importDefault(require("../utlis/errorHandler"));
const loggerService_1 = __importDefault(require("../utlis/loggerService"));
// Create User
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email } = req.body;
    try {
        const response = yield userService_1.default.addUser(username, password, email);
        res.status(200).send(response);
    }
    catch (err) {
        loggerService_1.default.warn(err.message);
        return (0, errorHandler_1.default)(err, res);
    }
});
// Get All Users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, perPage } = req.query;
    try {
        const response = yield userService_1.default.getAllUsers(page, perPage);
        res.status(200).send(response);
    }
    catch (err) {
        loggerService_1.default.warn(err.message);
        return (0, errorHandler_1.default)(err, res);
    }
});
//Get Single User
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const response = yield userService_1.default.getOneUser(id);
        res.status(200).send(response);
    }
    catch (err) {
        loggerService_1.default.warn(err.message);
        return (0, errorHandler_1.default)(err, res);
    }
});
//Update User
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { username, password, email } = req.body;
    try {
        const response = yield userService_1.default.updateUser(id, username, password, email);
        return res.status(200).send({ message: 'Successfully updated' });
    }
    catch (err) {
        loggerService_1.default.warn(err.message);
        return (0, errorHandler_1.default)(err, res);
    }
});
//Delete User
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const response = yield userService_1.default.deleteUser(id);
        return res.status(200).send({ message: 'Successfully delete' });
    }
    catch (err) {
        loggerService_1.default.warn(err.message);
        return (0, errorHandler_1.default)(err, res);
    }
});
exports.default = { createUser, getAllUsers, getOneUser, deleteUser, updateUser };
