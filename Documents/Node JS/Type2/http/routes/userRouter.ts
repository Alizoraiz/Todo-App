//import authController from '../controllers/authController'

import userController from '../controllers/userController';
const userRouter = require ('express').Router()
// import authenticateToken from '../controllers/authController.js'

userRouter.post('/addUser',userController.createUser)
userRouter.get('/allUsers',userController.getAllUsers)


userRouter.get('/:id',userController.getUser)
userRouter.put('/:id',userController.updateUser)
userRouter.delete('/:id',userController.deleteUser)

export default userRouter;