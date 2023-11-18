const router  = require('express').Router()
const taskController = require('../controllers/taskController')

router.get('/',taskController.getTask)
router.post('/', taskController.postTask)
router.put('/', taskController.putTask)
router.delete('/',taskController.deleteTask)
router.patch('/description', taskController.patchTaskDescription)
router.patch('/name', taskController.patchTaskName)
router.patch('/situation', taskController.patchTaskSituation)
router.patch('/category', taskController.patchTaskCategory)

module.exports = router