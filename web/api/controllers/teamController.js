const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { getTeam, postTeam, putTeam, deleteTeam } = require('../database/yup/teamSchemas')

const teamExists = async(team_id) => {
    const team = await prisma.team.findUnique({
        where: {
            team_id : team_id
        }
    })
    return team
}

exports.getTeam = (('/'), async(req, res) => {
    const team_id = req.body.team_id

    await getTeam.validate({team_id})
        .then(async() => {
            const team = await(teamExists(team_id))
            if (!team) {
                res.status(400).json({
                    error: 'true', message: "Team doesn't exist"
                })
                return
            }
            res.status(200).json(team)
        })
        .catch((err) => {
            res.status(400).json({
                error: 'true', message: `${err.message}`
            })
        })
})

exports.postTeam = (('/'), async(req, res) => {
    const team_name = req.body.team_name

    await postTeam.validate({team_name})
        .then(async() => {
            await prisma.$queryRaw`exec Tempus.spNewTeam ${team_name}`
            res.status(200).json({
                error: 'false', message: "Team succesfully inserted"
            })
        })
        .catch((err) => {
            res.status(400).json({
                error: 'true', message: `${err.message}`
            })
        })
})

exports.putTeam = (('/'), async(req, res) => {
    const team_id = req.body.team_id
    const team_name = req.body.team_name

    await putTeam.validate({team_id, team_name})
        .then(async() => {
            const team = await(teamExists(team_id))
            if (!team) {
                res.status(400).json({
                    error: 'true', message: "Team doesn't exist"
                })
                return
            }
            await prisma.$queryRaw`exec Tempus.spUpdateTeam
                ${team_id},
                ${team_name}`
            res.status(200).json({
                error: 'false', message: "Team succesfully updated"
            })
        })
        .catch((err) => {
            res.status(400).json({
                error: 'true', message: `${err.message}`
            })
        })
})

exports.deleteTeam = (('/'), async(req, res) => {
    const team_id = req.body.team_id

    await deleteTeam.validate({team_id})
        .then(async() => {
            const team = await(teamExists(team_id))
            if (!team) {
                res.status(400).json({
                    error: 'true', message: "Team doesn't exist"
                })
                return
            }
            await prisma.$queryRaw`exec Tempus.spDeleteTeam ${team_id}`
            res.status(200).json({
                error: 'false', message: "Team succesfully deleted"
            })
        })
        .catch((err) => {
            res.status(400).json({
                error: 'true', message: `${err.message}`
            })
        })
})

module.exports