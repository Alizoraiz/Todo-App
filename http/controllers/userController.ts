import UserService from '../../app/application/users/userService'
import handleError from '../utlis/errorHandler';
import logger from '../utlis/loggerService'
import FakerUser from '../../app/infrastructure/database/fakers/faker';


// Create User

const createUser = async (req: any,res: any) => {
   //const {body:{username,password,email}} = req
   try {      
      //const response = await UserService.addUser(username,password,email);
      const response = await UserService.addUser(FakerUser.userName(), FakerUser.password(),FakerUser.email());
      res.status(200).send(response)
   
   } catch (err: any) {
      logger.warn(err.message);
      return handleError(err, res);
   }
}

// Get All Users

const getAllUsers = async (req: any,res: any) => {
   const {query:{page,perPage}} = req
   try {
      const response = await UserService.getAllUsers(page,perPage);
      res.status(200).send(response);
   } catch (err:any) {
      logger.warn(err.message);
      return handleError(err, res);
   }
}

//Get Single User

const getOneUser = async (req: any,res: any) => {
   const {query:{id}} = req;
   try {
      const response = await UserService.getOneUser(id);
      res.status(200).send(response)
   
   } catch (err: any) {
     logger.warn(err.message);
     return handleError(err, res);
   }
}

//Update User

const updateUser = async (req: any,res: any) =>{
   const {query:{id}} = req;
   const {username,password,email} = req.body;
   
   try {
      const response = await UserService.updateUser(id,username,password,email);
      return res.status(200).send(response);
   } catch (err: any) {
      logger.warn(err.message);
      return handleError(err, res);
   }
}

//Delete User

const deleteUser = async (req: any,res: any) =>{
   const {query:{id}} = req;
   try {
      const response = await UserService.deleteUser(id);
      return res.status(200).send(response);

   } catch (err: any) {
      logger.warn(err.message);
      return handleError(err, res);
   }
}

  export default {createUser,getAllUsers,getOneUser,deleteUser,updateUser}