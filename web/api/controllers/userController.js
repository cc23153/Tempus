const { PrismaClient } = require('@prisma/client')
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
    const response =  await userExistsByUsername(req.body.username)
    if(response)
        res.status(200).json(response)
    else 
        res.status(400).json({
            error: 'true', message: 'User doesn\'t exist'
        })
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

exports.deleteUser = ( ('/'), async (req, res) => {
    const user_id = req.body.user_id
    const response = await userExistsById(user_id)

    if(!response){
        res.status(400).json({error: 'true', message: 'User doesn\'t exist'})
    }else{
        await prisma.$queryRaw`exec Tempus.spDeleteUser ${user_id}` 
        res.status(200).json({error: 'false', message: 'User deleted'})
    }

})

exports.patchUserUsername = ( ('/'), async (req, res) => {
    const user_id = req.body.user_id
    const username = req.body.username
    const response = await userExistsById(user_id)
    if(!response){
        res.status(400).json({error: 'true', message: 'User doesn\'t exist'})
    }else{
        await prisma.$queryRaw`exec Tempus.spUpdateUsername ${user_id}, ${username}` 
        res.status(200).json({error: 'false', message: 'Username succesfully updated'})
    }

})

exports.patchUserNickname = ( ('/'), async (req, res) => {
    const user_id = req.body.user_id
    const nickname = req.body.nickname
    const response = await userExistsById(user_id)
    if(!response){
        res.status(400).json({error: 'true', message: 'User doesn\'t exist'})
    }else{
        await prisma.$queryRaw`exec Tempus.spUpdateUserNickname ${user_id}, ${nickname}` 
        res.status(200).json({error: 'false', message: 'Nickname succesfully updated'})
    }

})

exports.patchUserEmail = ( ('/'), async (req, res) => {
    const user_id = req.body.user_id
    const email = req.body.email
    const response = await userExistsById(user_id)
    if(!response){
        res.status(400).json({error: 'true', message: 'User doesn\'t exist'})
    }else{
        await prisma.$queryRaw`exec Tempus.spUpdateUserEmail ${user_id}, ${email}` 
        res.status(200).json({error: 'false', message: 'Email succesfully updated'})
    }
})

exports.putUser = ( ('/'), async (req, res) => {
    const user_id = req.body.user_id
    const username = req.body.username
    const nickname = req.body.nickname
    const email = req.body.email
    const response = await userExistsById(user_id)
    if(!response){
        res.status(400).json({error: 'true', message: 'User doesn\'t exist'})
    }else{
        await prisma.$queryRaw`exec Tempus.spUpdateUser ${user_id}, ${username}, ${nickname}, ${email}` 
        res.status(200).json({error: 'false', message: 'User information succesfully updated'})
    }

})

module.exports

