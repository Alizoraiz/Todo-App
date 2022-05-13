import logger from "../http/utlis/loggerService"
import app from "../http/expressApp/app"
require('dotenv').config();

//PORT
const PORT = process.env.PORT;

//Server
app.listen (PORT,(): void =>{
    logger.info(`server is running on port ${PORT}`)
})