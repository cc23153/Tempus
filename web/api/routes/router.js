const router = require('express').Router()
const userRoutes = require('./userRoutes')
const taskRoutes = require('./taskRoutes')
const workspaceRoutes = require('./workspaceRoutes')
const authRoutes = require('./authRoutes')

console.log("hello")
router.use('/u', userRoutes)
router.use('/t', taskRoutes)
router.use('/w', workspaceRoutes)
router.use('/a', authRoutes)

module.exports = router