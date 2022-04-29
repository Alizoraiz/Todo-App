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
const UserEntity_1 = __importDefault(require("../../domain/user/UserEntity"));
const UserStore_1 = __importDefault(require("../../stores/UserStore"));
//Get Single User
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    let user = yield UserStore_1.default.findByUserId(id);
    if (user)
        res.status(200).send(user);
    else
        res.status(404).send("User not found");
});
//Update User
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.userId = req.params.id;
    const userEntity = UserEntity_1.default.createFromObj(req.body);
    const user = yield UserStore_1.default.update(userEntity);
    if (user[0] === 1)
        res.status(200).send("User has been updated");
    else
        res.send("Error, user not Updated");
});
//Delete User
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.userId = req.params.id;
    const userEntity = UserEntity_1.default.createFromObj(req.body);
    yield UserStore_1.default.remove(userEntity);
    res.status(200).send("User has been deleted");
});
// Create User
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Steps
    //1. Destruct body object from request
    //2. Create entitity object
    //3. Pass entity to store
    //4. return store entity to response
    const userEntity = UserEntity_1.default.createFromDetails(req.body.username, req.body.password, req.body.email);
    const user = yield UserStore_1.default.add(userEntity);
    res.send(user);
});
// Get All Users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Steps
    //1. Find from store
    //2. Return store object to response
    let usersObj = yield UserStore_1.default.findAllUsers();
    res.status(200).send(usersObj);
});
exports.default = { createUser, getAllUsers, getUser, deleteUser, updateUser };
