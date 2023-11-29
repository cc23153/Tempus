const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { getTeamMemberSchema, postTeamMemberSchema, deleteTeamMemberSchema } = require('../database/yup/teammembersSchemas')


exports.getTeamMember = (('/'), async (req, res) => {
    const teammembers_id = req.body.teammembers_id

    await getTeamMemberSchema.validate({ teammembers_id })
        .then(async() => {
            const tm = await prisma.teamMembers.findUnique({
                where: {
                    user_id: user_id,
                    team_id: team_id
                }
            })
            if(!tm){
                res.status(404).json({error: true, message: 'not found'})
                return
            }
            res.status(200).json({error: false, tm})
        })
})

exports.postTeamMember = (('/'), async (req, res) => {
    const user_id = req.body.user_id
    const team_id = req.body.team_id

    await postTeamMemberSchema.validate({ user_id, team_id })
    .then(async () => {
        const user = await prisma.user.findUnique({
            where: {
                user_id: user_id
            }
        })
        if(!user){
            res.status(404).json({error: true, message: 'user not found'})
            return
        }
        
        const team = await prisma.team.findUnique({
            where: {
                team_id: team_id
            }
        })
        if(!team){
            res.status(404).json({error: true, message: 'team not found'})
            return
        }

        const tm = await prisma.teamMembers.findFirst({
            where: {
                user_id: user_id,
                team_id: team_id
            }
        })
        if(tm){
            res.status(409).json({error: true, message: 'record already exist\'s'})
            return
        }
        await prisma.$queryRaw`exec Tempus.spAddTeamMember ${team_id}, ${user_id}`
        res.status(201).json({error: false, message: 'succesfully added'})
    })
    .catch((err) => {
        res.status(400).json({
            error: true, message: err.message
        })
    })

})

exports.deleteTeamMember = (('/'), async (req, res) => {
    const user_id = req.body.user_id
    const team_id = req.body.team_id

    await deleteTeamMemberSchema.validate({ user_id, team_id })
        .then(async () => {
            const tm = await prisma.teamMembers.findUnique({
                where: {
                    user_id: user_id,
                    team_id: team_id
                }
            })
            if(!tm){
                res.status(404).json({error: true, message: 'not found'})
                return
            }
            await prisma.$queryRaw`exec Tempus.spRemoveTeamMember ${user_id}, ${team_id}`
        })
        .catch((err) => {
            res.status(400).json({
                error: true, message: err.message
            })
        })
})


module.exports
