"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authController_1 = __importDefault(require("../controllers/authController"));
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
require('../../googleAuth');
const authRouter = require('express').Router();
function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}
authRouter.use(session({ secret: process.env.SECRET }));
authRouter.use(passport.initialize());
authRouter.use(passport.session());
//Google Auth
authRouter.get('/', (req, res) => {
    res.send('<a href ="/api/auth/googleAuth">Auhtenticate with Google</a>');
});
authRouter.get('/googleAuth', passport.authenticate('google', { scope: ['email', 'profile'], }));
authRouter.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/api/auth/protected',
    failureRedirect: '/api/auth/failure'
}));
authRouter.get('/protected', isLoggedIn, (req, res) => {
    res.send('Hello!');
});
authRouter.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('Successfully Logged Out');
});
// JWT Routes
authRouter.post('/login', authController_1.default.login);
authRouter.delete('/delete', authController_1.default.logout);
exports.default = authRouter;
