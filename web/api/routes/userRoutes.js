const router  = require('express').Router()
const userController = require('../controllers/userController')
const validateToken = require('../middlewares/auth')


router.get('/getuserteams',userController.getUserTeams)
router.post('/', userController.getUserByUsername)
router.put('/', userController.putUser)
router.delete('/', userController.deleteUser)
router.patch('/patchemail', userController.patchUserEmail)
router.patch('/patchnickname', userController.patchUserNickname)
router.patch('/patchusername', userController.patchUserUsername)
router.patch('/patchpassword', userController.patchUserPassword)

module.exports = router
