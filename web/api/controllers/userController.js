const { PrismaClient } = require('@prisma/client')
const { getUserSchema, postUserSchema, deleteUserSchema, patchUsernameSchema, patchNicknameSchema, patchPasswordSchema, patchEmailSchema, putUser, getUserTeamsSchema } = require('../database/yup/userSchemas')
const prisma = new PrismaClient()

const userExistsById = async (user_id) => {
    const response = await prisma.user.findUnique({
        where: {
            user_id: user_id
        },
    })
    return response;
}

const userExistsByUsername = async (username) => {
    const response = await prisma.user.findUnique({
        where: {
            username: username
        },
    })
    return response
}


exports.getUser = (('/'), async (req, res) => {
    const username = req.body.username
    await getUserSchema.validate({ username })
        .then(async function () {
            const response = await userExistsByUsername(req.body.username)
            if (!response) {
                res.status(400).json({
                    error: 'true', message: 'User doesn\'t exist'
                })
                return
            }
            res.status(200).json(response)
        })
        .catch((err) => {
            res.status(400).json({
                error: 'true', message: `${err.message}`
            })
        })


})

exports.getUserTeams = (('/'), async (req, res) => {
    const user_id = req.body.user_id

    await getUserTeamsSchema.validate({ user_id })
        .then(async () => {
            const exist = await userExistsById(user_id)
            if (!exist) {
                res.status(400).json({
                    error: 'true', message: 'User doesn\'t exist'
                })
                return
            }
            const userTeams = await prisma.UserTeams.findMany({
                where: {
                    user_id: user_id
                }
            })
            res.status(200).json(userTeams)
        })
        .catch((err) => {
            res.status(400).json({
                error: 'true', message: `${err.message}`
            })
        })

})

exports.postUser = (('/'), async (req, res) => {
    const { username, nickname, email, pwd_hash, pwd_salt } = req.body

    await postUserSchema.validate({username, nickname, email, pwd_hash, pwd_salt})
        .then(async () => {
            const alreadyExist = await prisma.user.findFirst({
                where: {
                    OR: [
                        { username: username },
                        { email: email }
                    ]
                }
            })
            if (alreadyExist) {
                res.status(400).json({ error: 'true', message: 'User already exists' })
                return
            }

            await prisma.$queryRaw`exec Tempus.spNewUser ${username}, ${nickname}, ${email}, ${pwd_hash}, ${pwd_salt}`
            res.status(201).json({ error: 'false', message: 'User created succesfully' })
        })
        .catch((err) => {
            res.status(400).json({
                error: 'true', message: `${err.message}`
            })
        })
})

exports.deleteUser = (('/'), async (req, res) => {
    const user_id = req.body.user_id

    await deleteUserSchema.validate({ user_id })
        .then(async () => {
            const response = await userExistsById(user_id)
            if (!response) {
                res.status(400).json({ error: 'true', message: 'User doesn\'t exist' })
                return
            }
            
            await prisma.$queryRaw`exec Tempus.spDeleteUser ${user_id}`
            res.status(200).json({ error: 'false', message: 'User deleted' })
            
        })
        .catch((err) => {
            res.status(400).json({
                error: 'true', message: `${err.message}`
            })
        })

})

exports.patchUserUsername = (('/'), async (req, res) => {
    const { user_id, username } = req.body

    await patchUsernameSchema.validate({ user_id, username })
        .then(async () => {
            const response = await userExistsById(user_id)
            if (!response) {
                res.status(400).json({ error: 'true', message: 'User doesn\'t exist' })
            } else {
                await prisma.$queryRaw`exec Tempus.spUpdateUsername ${user_id}, ${username}`
                res.status(200).json({ error: 'false', message: 'Username succesfully updated' })
            }
        })
        .catch((err) => {
            res.status(400).json({
                error: 'true', message: `${err.message}`
            })
        })
})

exports.patchUserNickname = (('/'), async (req, res) => {
    const { user_id, nickname } = req.body

    await patchNicknameSchema.validate({user_id, nickname})
        .then(async () => {
            const response = await userExistsById(user_id)
            if (!response) {
                res.status(400).json({ error: 'true', message: 'User doesn\'t exist' })
                return
            }

            await prisma.$queryRaw`exec Tempus.spUpdateUserNickname ${user_id}, ${nickname}`
            res.status(200).json({ error: 'false', message: 'Nickname succesfully updated' })

        })
        .catch((err) => {
            res.status(400).json({
                error: 'true', message: `${err.message}`
            })
        })
})

exports.patchUserEmail = (('/'), async (req, res) => {
    const { user_id, email } = req.body

    await patchEmailSchema.validate({user_id, email})
        .then(async () => {
            const response = await userExistsById(user_id)
            if (!response) {
                res.status(400).json({ error: 'true', message: 'User doesn\'t exist' })
                return
            }
            await prisma.$queryRaw`exec Tempus.spUpdateUserEmail ${user_id}, ${email}`
            res.status(200).json({ error: 'false', message: 'Email succesfully updated' })
        })
        .catch((err) => {
            res.status(400).json({
                error: 'true', message: `${err.message}`
            })
        })

})

exports.patchUserPassword = (('/'), async (req, res) => {
    const { user_id, pwd_hash, pwd_salt } = req.body

    await patchPasswordSchema.validate({user_id, pwd_hash, pwd_salt})
        .then(async () => {
            const response = await userExistsById(user_id)
            if (!response) {
                res.status(400).json({ error: 'true', message: 'User doesn\'t exist' })
                return
            }

            await prisma.$queryRaw`exec Tempus.spUpdateUserPassword ${user_id}, ${pwd_hash}, ${pwd_salt}`
            res.status(200).json({ error: 'false', message: 'Password succesfully updated' })

        })
        .catch((err) => {
            res.status(400).json({
                error: 'true', message: `${err.message}`
            })
        })
})

exports.putUser = (('/'), async (req, res) => {
    const { user_id, username, nickname, email } = req.body

    await postUserSchema.validate({user_id, username, nickname, email})
        .then(async () => {
            const response = await userExistsById(user_id)
            if (!response) {
                res.status(400).json({ error: 'true', message: 'User doesn\'t exist' })
                return
            }
            
            await prisma.$queryRaw`exec Tempus.spUpdateUser ${user_id}, ${username}, ${nickname}, ${email}`
            res.status(200).json({ error: 'false', message: 'User information succesfully updated' })
        })
        .catch((err) => {
            res.status(400).json({
                error: 'true', message: `${err.message}`
            })
        })

})

module.exports

