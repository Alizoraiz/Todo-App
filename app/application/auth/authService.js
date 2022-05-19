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
const customError_1 = __importDefault(require("../../infrastructure/mysqlrepositories/repositries/exceptions/customError"));
const UserRepositry_1 = __importDefault(require("../../infrastructure/mysqlrepositories/repositries/UserRepositry"));
const jwtService_1 = __importDefault(require("../../infrastructure/services/jwtService"));
//import TYPES from '../../infrastructure/inversify/types';
//import myContainer from '../../infrastructure/inversify/inversifyConfig'
require('dotenv').config();
//const authInfraStructureService = myContainer.get<AuthInfraStructureService>(AuthInfraStructureService);
class AuthService {
    constructor() {
        //public authInfraStructureService: AuthInfraStructureService
        //constructor(@inject(TYPES.AuthInfrastructureService) authInfraStructureService: AuthInfraStructureService) {this.authInfraStructureService = authInfraStructureService}
        this.refreshTokens = [];
    }
}
_a = AuthService;
AuthService.login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Authenticate Users
        const user = yield UserRepositry_1.default.findByEmail(email);
        if (!user)
            throw new customError_1.default(400, 'No such user exists');
        if (password != user.password)
            throw new customError_1.default(400, 'Password doesnt match');
        //generate token
        const accessToken = jwtService_1.default.generateAccessToken(user);
        const refreshToken = jwtService_1.default.generateRefreshToken(user);
        return ({ accessToken: accessToken, refreshToken: refreshToken, user });
    }
    catch (error) {
        throw new customError_1.default(400, error.message);
    }
});
exports.default = AuthService;
