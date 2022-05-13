"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loggerService_1 = __importDefault(require("../http/utlis/loggerService"));
const app_1 = __importDefault(require("../http/expressApp/app"));
require('dotenv').config();
//PORT
const PORT = process.env.PORT;
//Server
app_1.default.listen(PORT, () => {
    loggerService_1.default.info(`server is running on port ${PORT}`);
});
