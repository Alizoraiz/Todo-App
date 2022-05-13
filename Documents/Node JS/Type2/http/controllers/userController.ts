import UserService from '../../app/services/users/userService'
import handleError from '../utlis/errorHandler';
import logger from '../utlis/loggerService'


// Create User

const createUser = async (req: any,res: any) => {
   const {username,password,email} = req.body
   try {
      const response = await UserService.addUser(username, password,email);
      res.status(200).send(response)
   
   } catch (err: any) {
      logger.warn(err.message);
      return handleError(err, res);
   }
}

// Get All Users

const getAllUsers = async (req: any,res: any) => {
   const {page,perPage} = req.query
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
   const {id} = req.params;
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
   const {id} = req.params;
   const {username,password,email} = req.body;
   
   try {
      const response = await UserService.updateUser(id,username,password,email);
      return res.status(200).send({message:'Successfully updated'});
   } catch (err: any) {
      logger.warn(err.message);
      return handleError(err, res);
   }
}

//Delete User

const deleteUser = async (req: any,res: any) =>{
   const {id} = req.params;
   try {
      const response = await UserService.deleteUser(id);
      return res.status(200).send({message:'Successfully delete'});

   } catch (err: any) {
      logger.warn(err.message);
      return handleError(err, res);
   }
}

  export default {createUser,getAllUsers,getOneUser,deleteUser,updateUser}