const router  = require('express').Router()
const userController = require('../controllers/userController')

router.get('/',userController.getUser)
router.get('/getuserteams',userController.getUserTeams)
router.post('/', userController.postUser)
router.put('/', userController.putUser)
router.delete('/', userController.deleteUser)
router.patch('/patchemail', userController.patchUserEmail)
router.patch('/patchnickname', userController.patchUserNickname)
router.patch('/patchusername', userController.patchUserUsername)
router.patch('/patchpassword', userController.patchUserPassword)

module.exports = router
