"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
// app.use(express.json());
class AuthInfraStructureService {
    static generateAccessToken(user) {
        return jsonwebtoken_1.default.sign({ data: user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
    }
    static generateRefreshToken(user) {
        return jsonwebtoken_1.default.sign({ data: user }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1h' });
    }
    static verifyToken(bearerToken) {
        try {
            const response = jsonwebtoken_1.default.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET);
            if (!response) {
                return false;
            }
            return true;
        }
        catch (err) {
            return false;
        }
    }
}
exports.default = AuthInfraStructureService;
