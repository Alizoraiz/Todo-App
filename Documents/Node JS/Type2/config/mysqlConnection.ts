import {Sequelize, DataTypes} from 'sequelize';
import dbConfig from "./dbConfig"
import logger from "../http/utlis/loggerService"

const sequelize = new Sequelize( 
    dbConfig.DB || '',
    dbConfig.USER || '',
    dbConfig.PASSWORD || '', {
        host: dbConfig.HOST || '',
        dialect: 'mysql',
    }
)

sequelize.authenticate()
.then (() =>{
    logger.info('Connected');
})
.catch((err: Error) =>{
    logger.info(`Error: ${err}`);
})

 const mysqlConnection:any = {}

mysqlConnection.Sequelize = Sequelize
mysqlConnection.sequelize = sequelize

mysqlConnection.sequelize.sync({force:false})

.then (()=>{
    logger.info('yes resync done')
})

export default sequelize