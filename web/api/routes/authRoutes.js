const router = require('express').Router()
const authController = require('../controllers/authController')
const auth = require('../middlewares/auth')


router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.get('/logout', authController.logout)

module.exports = router