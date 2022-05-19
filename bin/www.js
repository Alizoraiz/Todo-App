"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
require("reflect-metadata");
const loggerService_1 = __importDefault(require("../http/utlis/loggerService"));
const app_1 = __importDefault(require("../http/expressApp/app"));
require('dotenv').config();
const program = new commander_1.Command();
program
    .option("-d, --debug", "output extra debugging", true)
    .option("-p, --port-number [type]", "specify port for express server") // this will be set to true if the user doesnt specify it
    .parse();
const options = program.opts();
let portNumber = '';
if (options.portNumber) {
    portNumber = options.portNumber === true ? "8080" : options.portNumber;
}
//Server
app_1.default.listen(portNumber, () => {
    loggerService_1.default.info(`server is running on port ${portNumber}`);
});
