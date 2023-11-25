const router = require('express').Router()
const userRoutes = require('./userRoutes')
const taskRoutes = require('./taskRoutes')
const workspaceRoutes = require('./workspaceRoutes')
const authRoutes = require('./authRoutes')
const commentRoutes = require('./commentRoutes')

router.use('/u', userRoutes)
router.use('/t', taskRoutes)
router.use('/w', workspaceRoutes)
router.use('/a', authRoutes)
router.use('/c', commentRoutes)

module.exports = router