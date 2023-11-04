const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.getUser = (('/'), async (req, res) => {
    const response = await prisma.user.findUnique({
        where: {
            username: req.body.username,
        },
    })
    if(response)
        res.status(200).json(response)
    else
        res.status(401).json({error: 'true', message: 'User doesn\'t exist'})
})

exports.postUser = (('/'), async (req, res) => {
    const username = req.body.username
    const nickname = req.body.nickname
    const email = req.body.email
    const pwd_hash = req.body.pwd_hash
    const pwd_salt = req.body.pwd_salt
    // Presumimos que esses dados já estão 'sanitized'; Essa sanitização deve ocorrer no aplicativo web

    const alreadyExist =  await prisma.user.findFirst({
        where: {
            OR: [
                { username: username },
                { email: email }
            ]
        }
    })
    if(alreadyExist){
        res.status(400).json({error: 'true', message: 'User already exists'})
        return
    }
    await prisma.$queryRaw`exec Tempus.spNewUser ${username}, ${nickname}, ${email}, ${pwd_hash}, ${pwd_salt}`
    res.status(201).json({error: 'false', message: 'User created succesfully'}) 
})

exports.putUser = (('/'), async (req, res) => {

})

module.exports

