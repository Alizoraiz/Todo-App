import {Sequelize, DataTypes} from 'sequelize';
import dbConfig from "./dbConfig"


console.log(dbConfig.DB);

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
    console.log('Connected');
})
.catch((err: Error) =>{
    console.log(`Error: ${err}`);
})

 const mysqlConnection:any = {}

mysqlConnection.Sequelize = Sequelize
mysqlConnection.sequelize = sequelize

mysqlConnection.sequelize.sync({force:false})

.then (()=>{
    console.log('yes resync done')
})

export default sequelize