const router  = require('express').Router()
const userController = require('../controllers/userController')

router.get('/u',userController.getUser)


module.exports = router
