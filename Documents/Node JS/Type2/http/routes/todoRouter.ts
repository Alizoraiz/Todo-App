import todoController from '../controllers/todoController'//TODO
// import authController from '../controllers/authController'
const todoRouter = require ('express').Router()
//import authenticateToken from '../controllers/authController'

todoRouter.post('/addTodo',todoController.addTodo)
todoRouter.get('/allTodos',todoController.getAllTodo)

todoRouter.get('/:id',todoController.getOneTodo)
todoRouter.put('/:id',todoController.updateTodo)
todoRouter.delete('/:id',todoController.deleteTodo)

export default todoRouter;
