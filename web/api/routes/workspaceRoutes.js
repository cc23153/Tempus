const router  = require('express').Router()
const workspaceController = require('../controllers/workspaceController')

router.get('/',workspaceController.getWorkspace)


module.exports = router