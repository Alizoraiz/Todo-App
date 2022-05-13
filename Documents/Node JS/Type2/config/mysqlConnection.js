"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConfig_1 = __importDefault(require("./dbConfig"));
const loggerService_1 = __importDefault(require("../http/utlis/loggerService"));
const sequelize = new sequelize_1.Sequelize(dbConfig_1.default.DB || '', dbConfig_1.default.USER || '', dbConfig_1.default.PASSWORD || '', {
    host: dbConfig_1.default.HOST || '',
    dialect: 'mysql',
});
sequelize.authenticate()
    .then(() => {
    loggerService_1.default.info('Connected');
})
    .catch((err) => {
    loggerService_1.default.info(`Error: ${err}`);
});
const mysqlConnection = {};
mysqlConnection.Sequelize = sequelize_1.Sequelize;
mysqlConnection.sequelize = sequelize;
mysqlConnection.sequelize.sync({ force: false })
    .then(() => {
    loggerService_1.default.info('yes resync done');
});
exports.default = sequelize;
