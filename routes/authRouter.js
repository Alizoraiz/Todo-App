const authController = require ('../controllers/authController.js')
const router = require ('express').Router()

router.post('/login', authController.login)


module.exports = router;