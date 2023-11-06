const router  = require('express').Router()
const workspaceController = require('../controllers/workspaceController')

router.get('/',workspaceController.getWorkspace)
router.post('/', workspaceController.postWorkspace)
router.put('/', workspaceController.putWorkspace)
router.delete('/',workspaceController.deleteWorkspace)
router.patch('/patchname', workspaceController.patchWorkspaceName)
router.patch('/patchdescription', workspaceController.patchWorkspaceDescription)
router.patch('/patchadmin', workspaceController.patchWorkspaceAdmin)

module.exports = router