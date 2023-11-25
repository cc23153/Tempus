const router = require('express').Router()
const authController = require('../controllers/authController')
const ola = require('../middlewares/ola')


router.post('/signup', ola, authController.signup)
router.post('/login', ola, authController.login)
router.get('/logout', ola, authController.logout)

module.exports = router