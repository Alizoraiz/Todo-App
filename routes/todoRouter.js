const todoController = require ('../controllers/todoController.js')
const authController = require ('../controllers/authController.js')
const router = require ('express').Router()
const authenticateToken = require('../controllers/authController.js')

router.post('/addTodo',authController.authenticateToken,todoController.addTodo)
router.get('/allTodos',authController.authenticateToken,todoController.getAllTodo)

router.get('/:id',authController.authenticateToken,todoController.getOneTodo)
router.put('/:id',authController.authenticateToken,todoController.updateTodo)
router.delete('/:id',authController.authenticateToken,todoController.deleteTodo)

module.exports = router;