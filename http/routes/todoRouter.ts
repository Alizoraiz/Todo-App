import TodoController from '../controllers/todoController'
import AuthMiddleware from '../middlewares/auth'
import myContainer from '../../app/infrastructure/config/inversifyConfig';
const todoRouter = require ('express').Router()
const todoController = myContainer.get(TodoController);



todoRouter.post('/addTodo',AuthMiddleware.authenticate,todoController.addTodo)
todoRouter.get('/allTodos',AuthMiddleware.authenticate, todoController.getAllTodo)

todoRouter.get('/:id',AuthMiddleware.authenticate,todoController.getOneTodo)
todoRouter.put('/:id',AuthMiddleware.authenticate,todoController.updateTodo)
todoRouter.delete('/:id',AuthMiddleware.authenticate,todoController.deleteTodo)

export default todoRouter;
