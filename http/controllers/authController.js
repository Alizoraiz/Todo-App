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
const authService_1 = __importDefault(require("../../app/application/auth/authService"));
const errorHandler_1 = __importDefault(require("../../app/infrastructure/mysqlrepositories/repositries/exceptions/errorHandler"));
class JwtAuthController {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body: { email, password } } = req;
                const response = yield authService_1.default.login(email, password);
                res.status(200).send(response);
            }
            catch (err) {
                return (0, errorHandler_1.default)(err, res);
            }
        });
    }
    static logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let refreshTokens = [];
            refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
        });
    }
}
exports.default = JwtAuthController;
