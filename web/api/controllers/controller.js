const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.root = (('/'), (req,res) =>{
    res.json("Hello, World!")
})

module.exports