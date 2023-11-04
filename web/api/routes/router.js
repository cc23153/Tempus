const router = require('express').Router()
const userRoutes = require('./userRoutes')
const taskRoutes = require('./taskRoutes')
const workspaceRoutes = require('./workspaceRoutes')


router.use('/u', userRoutes)
router.use('/t', taskRoutes)
router.use('/w', workspaceRoutes)

module.exports = router