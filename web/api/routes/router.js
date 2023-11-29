const router = require('express').Router()

const userRoutes = require('./userRoutes')
const workspaceRoutes = require('./workspaceRoutes')
const authRoutes = require('./authRoutes')
const commentRoutes = require('./commentRoutes')
const categoryRoutes = require('./categoryRoutes')
const taskRoutes = require('./taskRoutes')
const teamRoutes = require('./teamRoutes')
const teammembersRoutes = require('./teammembersRoutes')


router.use('/u', userRoutes)
router.use('/w', workspaceRoutes)
router.use('/a', authRoutes)
router.use('/co', commentRoutes)
router.use('/ca', categoryRoutes)
router.use('/ta', taskRoutes)
router.use('/te', teamRoutes)
router.use('/tm', teammembersRoutes)

module.exports = router