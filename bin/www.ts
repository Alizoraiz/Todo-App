import { Command } from 'commander';
import "reflect-metadata";
import logger from "../http/utlis/loggerService"
import app from "../http/expressApp/app"

require('dotenv').config();
const program = new Command();

program
  .option("-d, --debug", "output extra debugging", true)
  .option("-p, --port-number [type]", "specify port for express server") // this will be set to true if the user doesnt specify it
  .parse();

const options = program.opts();

let portNumber: string = '';
if (options.portNumber) {
  portNumber = options.portNumber === true ? "8080" : options.portNumber;
}

//Server
app.listen (portNumber,(): void =>{
    logger.info(`server is running on port ${portNumber}`)
})