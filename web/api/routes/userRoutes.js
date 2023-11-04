const router  = require('express').Router()
const userController = require('../controllers/userController')

router.get('/',userController.getUser)
router.post('/', userController.postUser)
router.put('/', userController.putUser)

module.exports = router
