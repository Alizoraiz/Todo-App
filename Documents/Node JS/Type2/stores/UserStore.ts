import UserEntity from '../domain/user/UserEntity'
import Sequelize from 'sequelize'
import mysqlConnection from '../config/mysqlConnection';

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
        const userObj = await UserModel.create(userEntity);
        return UserEntity.createFromObj(userObj) 
    }

    static async findByUserId(userId: string){
        const user = await UserModel.findOne({where: { userId }})
        return UserEntity.createFromObj(user);
    }
    
    static async findAllUsers(){
        const userObjs = await UserModel.findAll();
        return userObjs.map((userObj: any) => UserEntity.createFromObj(userObj))
    }

    static async remove(userEntity: UserEntity){
        return await UserModel.destroy({where: {userId: userEntity.userId}})
    }

    static async update(userEntity: UserEntity){
        return await UserModel.update(userEntity, {where: {userId: userEntity.userId}})
    }
      
}

export default UserStore



