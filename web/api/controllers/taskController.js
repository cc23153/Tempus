const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

exports.getTask = (('/'),async(req, res)=>{
    await res.json('msg: "In construction"')
})

exports.deleteTask = (('/'), async(req, res)=> {
    await res.json('msg: "In construction"') 
})


module.exports 