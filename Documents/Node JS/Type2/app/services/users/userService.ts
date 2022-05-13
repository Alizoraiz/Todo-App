import UserEntity from '../../../domain/user/UserEntity'
import UserStore from '../../../stores/UserStore'
import PaginationOptions from '../utils/pagination/paginationOptions';
import CustomError from '../../../stores/exceptions/customError';
import logger from "../../../http/utlis/loggerService"


class UserService {
   //Create User
   static addUser = async(username:string, password: string, email: string) => {
      try {
         if (!username|| !email || !password) {
            throw new CustomError(400, 'Must provide values for username, email & password');
         }
         const userEntity: UserEntity = UserEntity.createFromDetails(username,password,email);
         return await UserStore.add(userEntity);
      } catch (error: any) {
         throw new CustomError(400, error.message);
      }
   }
   
   //Get All User's
   static getAllUsers = async (page: number, perPage: number) =>{
      try {
         const pagination = new PaginationOptions(page, perPage);       
         let users: any = await UserStore.findAllUsers(pagination);
         return users;

      } catch (error: any) {
         throw new CustomError(400, error.message);
      } 
   }
   
   //Get Single User
   static getOneUser = async(userId:string) => {
      try {
         let user: any = await UserStore.findByUserId(userId);
         return user;
      } catch (error: any) {
         logger.warn(error.message);
         throw new CustomError(400, error.message);
      }
   }
   
   //Update User
   static updateUser = async(userId: string, username: string, password:string, email:string) =>{
      try {
         const userUpdateObj = {userId: userId, username: username, password: password, email: email};
         const userEntity: any = UserEntity.createFromObj(userUpdateObj);
         const user: any = await UserStore.update(userEntity);

         if (!user[0]) {
            throw new CustomError(400, 'User not found');
         }
         
         return user;
      
      } catch (error: any) {
         throw new CustomError(400, error.message);
      }
   }

   //Delete User
   static deleteUser = async(userId:string) => {
      try {
         let user: any = await UserStore.remove(userId);
         
         if (!user) {
            throw new CustomError(400, 'Unable to delete, Todo ID does not exist');
         }
         return user; 
      } catch (error: any) {
         throw new CustomError(400, error.message); 
      }
   }
}
 export default UserService