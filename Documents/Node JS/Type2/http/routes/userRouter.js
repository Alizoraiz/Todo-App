"use strict";
//import authController from '../controllers/authController'
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = __importDefault(require("../controllers/userController"));
const userRouter = require('express').Router();
// import authenticateToken from '../controllers/authController.js'
userRouter.post('/addUser', userController_1.default.createUser);
userRouter.get('/allUsers', userController_1.default.getAllUsers);
userRouter.get('/:id', userController_1.default.getUser);
userRouter.put('/:id', userController_1.default.updateUser);
userRouter.delete('/:id', userController_1.default.deleteUser);
exports.default = userRouter;
