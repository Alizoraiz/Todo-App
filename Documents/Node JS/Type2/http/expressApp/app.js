"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
const app = express();
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Routers
const todoRouter_1 = __importDefault(require("../routes/todoRouter"));
app.use('/api/todos', todoRouter_1.default);
const authRouter_1 = __importDefault(require("../routes/authRouter"));
app.use('/api/auth', authRouter_1.default);
const userRouter_1 = __importDefault(require("../routes/userRouter"));
app.use('/api/user', userRouter_1.default);
//Testing API
app.get('/', (req, res) => {
    res.json({
        message: 'Hello form the API Land'
    });
});
//PORT
const PORT = process.env.PORT;
//Server
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
