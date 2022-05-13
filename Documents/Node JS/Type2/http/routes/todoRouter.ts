import todoController from '../controllers/todoController'

const todoRouter = require ('express').Router()

todoRouter.post('/addTodo',todoController.addTodo)
todoRouter.get('/allTodos',todoController.getAllTodo)

todoRouter.get('/:id',todoController.getOneTodo)
todoRouter.put('/:id',todoController.updateTodo)
todoRouter.delete('/:id',todoController.deleteTodo)

export default todoRouter;
