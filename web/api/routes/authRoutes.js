const router = require('express').Router()
const authController = require('../controllers/authController')
const auth = require('../middlewares/auth')


router.post('/signUp', authController.signup)
router.post('/signIn', authController.login)
router.get('/logout', authController.logout)

module.exports = router