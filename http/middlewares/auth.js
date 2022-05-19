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
const jwtService_1 = __importDefault(require("../../app/infrastructure/services/jwtService"));
class AuthMiddleware {
    static authenticate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { authorization: { headers } } = req;
                if (headers) {
                    const token = req.headers.authorization.split(' ')[1];
                    const result = yield jwtService_1.default.verifyToken(token);
                    if (result) {
                        next();
                    }
                    else {
                        res.status(401).json({
                            message: 'You are not logged in!',
                        });
                    }
                }
                else {
                    res.status(401).json({
                        message: 'You are not logged in!',
                    });
                }
            }
            catch (error) {
            }
        });
    }
}
exports.default = AuthMiddleware;
