"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConfig_1 = __importDefault(require("./dbConfig"));
console.log(dbConfig_1.default.DB);
const sequelize = new sequelize_1.Sequelize(dbConfig_1.default.DB || '', dbConfig_1.default.USER || '', dbConfig_1.default.PASSWORD || '', {
    host: dbConfig_1.default.HOST || '',
    dialect: 'mysql',
});
sequelize.authenticate()
    .then(() => {
    console.log('Connected');
})
    .catch((err) => {
    console.log(`Error: ${err}`);
});
const mysqlConnection = {};
mysqlConnection.Sequelize = sequelize_1.Sequelize;
mysqlConnection.sequelize = sequelize;
mysqlConnection.sequelize.sync({ force: false })
    .then(() => {
    console.log('yes resync done');
});
exports.default = sequelize;
