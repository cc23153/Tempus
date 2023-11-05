const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const taskExist =  async (task_id) => {
    const task = await prisma.task.findUnique({
        where: {
            task_id: task_id
        }
    })
    return task
}

exports.getTask = (('/'),async(req, res)=>{
    const task_id = req.body.task_id
    const task = await taskExist(task_id)
    if(!task){
        res.status(400).json({error: true, message : "Task doesn't exist"})
        return
    }
    res.status(200).json(task)
})

exports.deleteTask = (('/'), async(req, res)=> {
    const task_id = req.body.task_id
    const task = await taskExist(task_id)
    if(!task){
        res.status(400).json({error: true, message : "Task doesn't exist"})
        return
   }
   
   await prisma.$queryRaw`exec Tempus.spDeleteTask ${task_id}`
   res.status(200).json({error: false, message: "Task succesfully deleted"})
})

exports.patchTaskName = (('/'), async(req, res)=> {
    const task_id = req.body.task_id
    const task_name = req.body.task_name
    const task = await taskExist(task_id)
    if(!task){
        res.status(400).json({error: true, message : "Task doesn't exist"})
        return
   }
   console.log(task_name)
   await prisma.$queryRaw`exec Tempus.spUpdateTaskName ${task_id}, ${task_name}`
   res.status(200).json({error: false, message: "Task succesfully updated"})
})

exports.patchTaskDescription = (('/'), async(req, res)=> {
    const task_id = req.body.task_id
    const task_description = req.body.task_description
    const task = await taskExist(task_id)
    if(!task){
        res.status(400).json({error: true, message : "Task doesn't exist"})
        return
   }
   
   await prisma.$queryRaw`exec Tempus.spUpdateTaskDescription ${task_id}, ${task_description}`
   res.status(200).json({error: false, message: "Task succesfully updated"})
})
exports.patchTaskSituation = (('/'), async(req, res)=> {
    const task_id = req.body.task_id
    const task_situation = req.body.task_situation
    const task = await taskExist(task_id)
    if(!task){
        res.status(400).json({error: true, message : "Task doesn't exist"})
        return
   }
   
   await prisma.$queryRaw`exec Tempus.spUpdateTaskSituation ${task_id}, ${task_situation}`
   res.status(200).json({error: false, message: "Task succesfully updated"})
})


module.exports 