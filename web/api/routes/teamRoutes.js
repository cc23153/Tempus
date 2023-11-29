const router = require('express').Router()
const teamController = require('../controllers/teamController')

router.get('/', teamController.getTeam)
router.post('/', teamController.postTeam)
router.put('/', teamController.putTeam)
router.delete('/', teamController.deleteTeam)

module.exports = router