const router  = require('express').Router()
const taskController = require('../controllers/taskController')

router.get('/',taskController.getTask)

module.exports = router