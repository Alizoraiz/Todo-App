import UserEntity from '../../domain/user/UserEntity'
import UserStore from '../../stores/UserStore'
 

//Get Single User

const getUser = async (req: any,res: any) =>{
   let id: string = req.params.id
   let user: any = await UserStore.findByUserId(id)
   
   if(user)
      res.status(200).send(user)
   else
      res.status(404).send("User not found")
 }

//Update User
const updateUser = async (req: any,res: any) =>{
   req.body.userId = req.params.id;
   const userEntity: any = UserEntity.createFromObj(req.body);   
   const user: any = await UserStore.update(userEntity);

   if (user[0] === 1) 
   res.status(200).send("User has been updated");
   else
   res.send("Error, user not Updated")   
}

//Delete User

const deleteUser = async (req: any,res: any) =>{
   req.body.userId = req.params.id;
   const userEntity: any = UserEntity.createFromObj(req.body);

   await UserStore.remove(userEntity)
   res.status(200).send("User has been deleted")
}

 // Create User

const createUser = async (req: any,res: any) => {
   //Steps
    //1. Destruct body object from request
    //2. Create entitity object
    //3. Pass entity to store
    //4. return store entity to response
    
   const userEntity: any = UserEntity.createFromDetails(req.body.username,req.body.password,req.body.email);
   const user = await UserStore.add(userEntity)
   res.send(user)
 }

 // Get All Users

const getAllUsers = async (req: any,res: any) =>{
   //Steps
   //1. Find from store
   //2. Return store object to response
   let usersObj = await UserStore.findAllUsers()
   res.status(200).send(usersObj)
}

 export default {createUser,getAllUsers,getUser,deleteUser,updateUser}