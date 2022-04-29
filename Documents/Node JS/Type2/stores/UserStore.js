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
const UserEntity_1 = __importDefault(require("../domain/user/UserEntity"));
const sequelize_1 = __importDefault(require("sequelize"));
const mysqlConnection_1 = __importDefault(require("../config/mysqlConnection"));
const UserModel = mysqlConnection_1.default.define("user", {
    userId: {
        type: sequelize_1.default.DataTypes.UUID,
        defaultValue: sequelize_1.default.DataTypes.UUIDV4,
        primaryKey: true,
    },
    username: {
        type: sequelize_1.default.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.default.DataTypes.INTEGER
    },
    email: {
        type: sequelize_1.default.DataTypes.STRING
    }
});
class UserStore {
    static add(userEntity) {
        return __awaiter(this, void 0, void 0, function* () {
            const userObj = yield UserModel.create(userEntity);
            return UserEntity_1.default.createFromObj(userObj);
        });
    }
    static findByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserModel.findOne({ where: { userId } });
            return UserEntity_1.default.createFromObj(user);
        });
    }
    static findAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const userObjs = yield UserModel.findAll();
            return userObjs.map((userObj) => UserEntity_1.default.createFromObj(userObj));
        });
    }
    static remove(userEntity) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel.destroy({ where: { userId: userEntity.userId } });
        });
    }
    static update(userEntity) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel.update(userEntity, { where: { userId: userEntity.userId } });
        });
    }
}
exports.default = UserStore;
