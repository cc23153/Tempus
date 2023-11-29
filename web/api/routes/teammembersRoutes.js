const router = require('express').Router()
const teammemberController  = require('../controllers/teammemberController')

router.get('/', teammemberController.getTeamMember)
router.post('/', teammemberController.postTeamMember)
router.delete('/', teammemberController.deleteTeamMember)

module.exports = router