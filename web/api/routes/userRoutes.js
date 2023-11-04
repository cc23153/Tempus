const router  = require('express').Router()
const userController = require('../controllers/userController')

router.get('/',userController.getUser)
router.post('/', userController.postUser)
router.put('/', userController.putUser)
router.delete('/', userController.deleteUser)
router.patch('/patchemail', userController.patchUserEmail)
router.patch('/patchnickname', userController.patchUserNickname)
router.patch('/patchusername', userController.patchUserUsername)

module.exports = router
