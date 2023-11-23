const router = require('express').Router()

const userRoutes = require('./userRoutes')
const taskRoutes = require('./taskRoutes')
const workspaceRoutes = require('./workspaceRoutes')
const commentRoutes = require('./commentRoutes')


router.use('/u', userRoutes)
router.use('/t', taskRoutes)
router.use('/w', workspaceRoutes)
router.use('/c', commentRoutes)

module.exports = router