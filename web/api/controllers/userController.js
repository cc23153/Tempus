const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

exports.getUser = (('/'), async(req, res) =>{
    res.json('body: "Hello World"')
})

exports.postUser = (('/'), async(req,res) =>{
    const username = req.query.username
    const nickname = req.query.nickname 
    const email = req.query.email 
    const pwd_hash = req.query.pwd_hash 
    const pwd_salt = req.query.pwd_salt
    try {
        await prisma.$queryRaw`exec Tempus.spNewUser ${username}, ${nickname}, ${email}, ${pwd_hash}, ${pwd_salt}`
        res.status(200)
    } catch (error) {
        console.log(`${error}`)
        res.status(400)
    }
})

module.exports

