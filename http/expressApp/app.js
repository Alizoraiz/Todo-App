"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const todoRouter_1 = __importDefault(require("../routes/todoRouter"));
const authRouter_1 = __importDefault(require("../routes/authRouter"));
const userRouter_1 = __importDefault(require("../routes/userRouter"));
require('dotenv').config();
const app = express();
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Routers
app.use('/api/todos', todoRouter_1.default);
app.use('/api/auth', authRouter_1.default);
app.use('/api/user', userRouter_1.default);
//Testing API
app.get('/', (req, res) => {
    res.json({
        message: 'Hello form the API Land'
    });
});
exports.default = app;
