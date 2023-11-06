const router  = require('express').Router()
const taskController = require('../controllers/taskController')

router.get('/',taskController.getTask)
router.post('/', taskController.postTask)
router.put('/', taskController.putTask)
router.delete('/',taskController.deleteTask)
router.patch('/patchdescription', taskController.patchTaskDescription)
router.patch('/patchname', taskController.patchTaskName)
router.patch('/patchsituation', taskController.patchTaskSituation)

module.exports = router