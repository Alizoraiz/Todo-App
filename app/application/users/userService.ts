import UserEntity from '../../domain/user/UserEntity'
import PaginationOptions from '../../services/utils/pagination/paginationOptions';
import logger from "../../../http/utlis/loggerService"
import UserRepositry from '../../infrastructure/mysqlrepositories/repositries/UserRepositry';
import AddUserException from '../../infrastructure/exceptions/users/addUserException';
import AllUserException from '../../infrastructure/exceptions/users/allUserException';
import SingleUserException from '../../infrastructure/exceptions/users/singleUserException';
import UpdateUserException from '../../infrastructure/exceptions/users/updateUserException';
import DeleteUserException from '../../infrastructure/exceptions/users/deleteUserException';
class UserService {
   //Create User
   static addUser = async(username:string, password: string, email: string) => {
      try {
         if (!username|| !email || !password) {
            throw new AddUserException(400, 'Must provide values for username, email & password');
         }
         const userEntity: UserEntity = UserEntity.createFromDetails(username,password,email);
         return await UserRepositry.add(userEntity);
      } catch (error: any) {
         logger.error(error.message);
         throw new AddUserException(400, error.message);
      }
   }
   
   //Get All User's
   static getAllUsers = async (page: number, perPage: number) =>{
      try {
         const pagination = new PaginationOptions(page, perPage);       
         let users: any = await UserRepositry.findAllUsers(pagination);
         return users;

      } catch (error: any) {
         logger.error(error.message);
         throw new AllUserException(400, error.message);
      } 
   }
   
   //Get Single User
   static getOneUser = async(userId:string) => {
      try {
         let user: any = await UserRepositry.findByUserId(userId);
         return user;
      } catch (error: any) {
         logger.error(error.message);
         throw new SingleUserException(400, error.message);
      }
   }
   
   //Update User
   static updateUser = async(userId: string, username: string, password:string, email:string) =>{
      try {
         const userUpdateObj = {userId: userId, username: username, password: password, email: email};
         const userEntity: any = UserEntity.createFromObj(userUpdateObj);
         const user: any = await UserRepositry.update(userEntity);

         if (!user[0]) {
            throw new UpdateUserException(400, 'User not found');
         }
         return {message:'Successfully updated'};
      
      } catch (error: any) {
         logger.error(error.message);
         throw new UpdateUserException(400, error.message);
      }
   }

   //Delete User
   static deleteUser = async(userId:string) => {
      try {
         let user: any = await UserRepositry.remove(userId);
         
         if (!user) {
            throw new DeleteUserException(400, 'Unable to delete, Todo ID does not exist');
         }
         return {message:'Successfully deleted'}; 
      } catch (error: any) {
         logger.error(error.message);
         throw new DeleteUserException(400, error.message); 
      }
   }
}
 export default UserService