const router = require('express').Router()
const controller = require('../controllers/controller')

router.get('/', controller.root)


module.exports = router