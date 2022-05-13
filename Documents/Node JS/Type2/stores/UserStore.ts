import UserEntity from '../domain/user/UserEntity'
import Sequelize from 'sequelize'
import mysqlConnection from '../config/mysqlConnection';
import PaginationOptions from '../app/services/utils/pagination/paginationOptions';
import PaginatedCollection from '../app/services/utils/pagination/paginationCollection';
import logger from "../http/utlis/loggerService"
import CustomError from './exceptions/customError';


const UserModel = mysqlConnection.define("user",{
    userId: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
    },
    username: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.DataTypes.INTEGER
    },
    email: {
        type: Sequelize.DataTypes.STRING
    }
});

class UserStore {
    static async add(userEntity: any){
        try {
            const userObj = await UserModel.create(userEntity);
            return UserEntity.createFromObj(userObj) 
        } catch (error:any) {
            logger.warn(error.message);
            throw new CustomError(400, error.message); 
        }
    }
    static async findByUserId(userId: string){
        try {
            const user = await UserModel.findOne({where: { userId }, raw:true})
            
            if (!user) {
                throw new CustomError(400, 'User does not exist');
            } else {
                return UserEntity.createFromObj(user)
            }
        } catch (error: any) {
            logger.warn(error.message);
            throw new CustomError(400, error.message); 
        }
    }
    
    static async findAllUsers(pagination: PaginationOptions){
        try{
            const userObjs = await UserModel.findAndCountAll({
                limit: pagination.limit(),
                offset: pagination.offset()  
            });
            const userCollection = userObjs.rows.map((userObj: any) => UserEntity.createFromObj(userObj));
            const paginatedCollection = new PaginatedCollection(pagination, userObjs.count, userCollection);
            return paginatedCollection.getPaginatedData();

        }catch(error: any){
            logger.warn(error.message);
            throw new CustomError(400, error.message); 
        }

    }

    static async remove(userId: string ){
        try {
            return await UserModel.destroy({where: {userId: userId}})
        } catch (error: any) {
            logger.warn(error.message);
            throw new CustomError(400, error.message); 
        }
    }

    static async update(userEntity: UserEntity){
        try {
            return await UserModel.update(userEntity, {where: {userId: userEntity.userId}})
        } catch (error: any) {
            logger.warn(error.message);
            throw new CustomError(400, error.message); 
        }
    }
}
export default UserStore