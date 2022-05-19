import userController from '../controllers/userController';
const userRouter = require ('express').Router()

userRouter.post('/addUser',userController.createUser)
userRouter.get('/allUsers',userController.getAllUsers)


userRouter.get('/:id',userController.getOneUser)
userRouter.put('/:id',userController.updateUser)
userRouter.delete('/:id',userController.deleteUser)

export default userRouter;