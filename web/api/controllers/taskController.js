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

exports.postTask = (('/'), async(req, res)=> {
    const task_situation = req.body.task_situation
    const task_name = req.body.task_name
    const task_content = req.body.task_content
    const workspace_id = req.body.workspace_id
    const task_begin = req.body.task_begin
    const task_end = req.body.task_end
    const task_category = req.body.task_category
    
    const workspaceExist =  async (task_id) => {
        const task = await prisma.task.findUnique({
            where: {
                task_id: task_id
            }
        })
        return task
    }

    if(!workspaceExist){
        res.status(400).json({error: true, message : "Workspace doesn't exist"})
        return
   }
   
   await prisma.$queryRaw`exec Tempus.spNewTask 
        ${task_name}, ${task_content}, 
        ${workspace_id}, ${task_situation}, 
        ${task_begin}, ${task_end}, ${task_category}`
   res.status(200).json({error: false, message: "Task succesfully inserted"})
})

exports.putTask = (('/'), async(req, res)=> {
    const task_id = req.body.task_id
    const task_situation = req.body.task_situation
    const task_name = req.body.task_name
    const task_content = req.body.task_content
    const workspace_id = req.body.workspace_id
    const task_begin = req.body.task_begin
    const task_end = req.body.task_end
    const task_category = req.body.task_category
    
    const workspaceExist =  async (workspace_id) => {
        const workspace_id = await prisma.task.findUnique({
            where: {
                workspace_id: workspace_id
            }
        })
        return workspace_id
    }

    if(!taskExist(task_id)){
        res.status(400).json({error: true, message : "Task doesn't exist"})
        return
   }

    if(!workspaceExist){
        res.status(400).json({error: true, message : "Workspace doesn't exist"})
        return
   }
   
   await prisma.$queryRaw`exec Tempus.spUpdateTask  
        ${task_id}, ${task_name}, 
        ${task_content}, ${workspace_id}, 
        ${task_situation}, ${task_begin}, 
        ${task_end}, ${task_category}`
   res.status(200).json({error: false, message: "Task succesfully updated"})
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