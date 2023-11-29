const router = require('express').Router()

const userRoutes = require('./userRoutes')
const taskRoutes = require('./taskRoutes')
const workspaceRoutes = require('./workspaceRoutes')
const authRoutes = require('./authRoutes')
const commentRoutes = require('./commentRoutes')
const teamRoutes = require('./teamRoutes')

router.use('/u', userRoutes)
router.use('/ta', taskRoutes)
router.use('/w', workspaceRoutes)
router.use('/a', authRoutes)
router.use('/c', commentRoutes)
router.use('/te', teamRoutes)

module.exports = router