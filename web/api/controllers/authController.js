const { PrismaClient } = require('@prisma/client')
const { signupSchema, loginSchema } = require('../database/yup/authSchemas.js')
const { generateHashAndSalt, verifyPassword } = require('../util/hashing.js')
const { generateJWT } = require('../util/jwt.js')
const prisma = new PrismaClient()

exports.signup = (('/'), async (req, res) => {
    const { username, nickname, email, pwd } = req.body
    const hash = generateHashAndSalt(pwd)
    const pwd_hash = hash[0]
    const pwd_salt = hash[1]

    await signupSchema.validate({ username, nickname, email, pwd })
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
                res.status(409).json({ error: 'true', message: 'User already exists' })
                return
            }

            await prisma.$queryRaw`exec Tempus.spNewUser ${username}, ${nickname}, ${email}, ${pwd_hash}, ${pwd_salt}`

            const token = generateJWT({ username, email })
            res.cookie('token', token, { httpOnly: false, maxAge: 604_800_000, secure: true })
            res.status(201).json({ error: 'false', message: 'User created successfully' });
        })
        .catch((err) => {
            res.status(400).json({
                error: 'true', message: `${err.message}`
            })
        })
})

exports.login = (('/login'), async (req, res) => {
    const { username, pwd } = req.body
    await loginSchema.validate({ username, pwd })
        .then(async () => {
            const alreadyExist = await prisma.user.findFirst({
                where: {
                    username: username
                }
            })
            if (!alreadyExist) {
                res.status(404).json({ error: 'true', message: 'User not found' })
                return
            }
            const select = await prisma.user.findUnique({
                where: {
                    username: username
                },
                select: {
                    password_hash: true,
                    password_salt: true
                }

            })

            const password = verifyPassword(pwd, select.password_hash, select.password_salt)

            if (!password) {
                res.status(401).json({ error: 'true', message: 'Unauthorized' })
                return
            }

            const token = generateJWT({ username })
            res.cookie('token', token, { httpOnly: false, maxAge: 604_800_000, secure: true, })
            res.status(200).json({ error: 'false', message: 'Successful login' })

        })
        .catch((err) => {
            res.status(400).json({ error: 'true', message: `${err.message}` })
            console.log(err)
        })

})

exports.logout = (('/'), async (req, res) => {
    res.cookie('token', '', { maxAge: 10 })
    res.status(200).json({ error: false, message: 'success' })
})