const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { getTask, postTask, deleteTask, patchTaskCategory, patchTaskDescription, patchTaskName, patchTaskSituation, patchTaskEnd } = require('../database/yup/taskSchemas')

const taskExist = async (task_id) => {
    const task = await prisma.task.findUnique({
        where: {
            task_id: task_id
        }
    })
    return task
}

exports.getTask = (('/'), async (req, res) => {
    const task_id = req.body.task_id

    await getTask.validate({ task_id })
        .then(async () => {
            const task = await taskExist(task_id)
            if (!task) {
                res.status(400).json({ error: true, message: "Task doesn't exist" })
                return
            }
            res.status(200).json(task)
        })
})

exports.getTaskByWorkspace = (('/'), async (req, res) => {
    const workspace_id = req.body.workspace_id

    await getTask.validate({ workspace_id })
        .then(async () => {
            const task = await prisma.task.findMany({
                where: {
                    workspace: workspace_id
                }
            })
            if (!task) {
                res.status(400).json({ error: true, message: "The workspace doesn't have any task" })
                return
            }
            res.status(200).json(task)
        })
})

// Não está funcionando
exports.postTask = (('/'), async (req, res) => {
    const task_situation = req.body.task_situation
    const task_name = req.body.task_name
    const task_description = req.body.task_description
    const workspace_id = req.body.workspace_id
    const task_begin = new Date(req.body.task_begin)
    const task_end = new Date(req.body.task_end)
    const task_category = (req.body.task_category)

    await postTask.validate({ task_situation, task_name, task_description, workspace_id, task_begin, task_end, task_category })
        .then(async () => {
            const workspaceExist = async (task_id) => {
                const task = await prisma.task.findUnique({
                    where: {
                        task_id: task_id
                    }
                })
                return task
            }

            if (!workspaceExist) {
                res.status(400).json({ error: true, message: "Workspace doesn't exist" })
                return
            }


            await prisma.$queryRaw`exec Tempus.spNewTask 
            ${task_name}, ${task_description}, 
            ${workspace_id}, ${task_situation}, 
            ${task_begin.toISOString()}, ${task_end.toISOString()}, ${task_category}`
            res.status(200).json({ error: false, message: "Task succesfully inserted" })

        })
        .catch((err) => {
            res.status(400).json({
                error: 'true', message: `${err.message}`
            })
        })

})

exports.putTask = (('/'), async (req, res) => {
    const task_id = req.body.task_id
    const task_situation = req.body.task_situation
    const task_name = req.body.task_name
    const task_description = req.body.task_description
    const workspace_id = req.body.workspace_id
    const task_begin = new Date(req.body.task_begin)
    const task_end = new Date(req.body.task_end)
    const task_category = req.body.task_category

    await postTask.validate({ task_situation, task_name, task_description, workspace_id, task_begin, task_end, task_category })
        .then(async () => {
            const workspaceExist = async (task_id) => {
                const task = await prisma.task.findUnique({
                    where: {
                        task_id: task_id
                    }
                })
                return task
            }

            if (!workspaceExist) {
                res.status(400).json({ error: true, message: "Workspace doesn't exist" })
                return
            }

            await prisma.$queryRaw`exec Tempus.spUpdateTask 
            ${task_id}, ${task_name}, 
            ${task_description}, ${workspace_id}, 
            ${task_situation}, ${task_begin}, 
            ${task_end}, ${task_category}`
            res.status(200).json({ error: false, message: "Task succesfully inserted" })

        })
        .catch((err) => {
            res.status(400).json({
                error: 'true', message: `${err.message}`
            })
        })

})

exports.deleteTask = (('/'), async (req, res) => {
    const task_id = req.body.task_id

    await deleteTask.validate({ task_id })
        .then(async () => {
            const task = await taskExist(task_id)
            if (!task) {
                res.status(400).json({ error: true, message: "Task doesn't exist" })
                return
            }

            await prisma.$queryRaw`exec Tempus.spDeleteTask ${task_id}`
            res.status(200).json({ error: false, message: "Task succesfully deleted" })
        })
        .catch((err) => {
            res.status(400).json({
                error: 'true', message: `${err.message}`
            })
        })


})

exports.patchTaskName = (('/'), async (req, res) => {
    const task_id = req.body.task_id
    const task_name = req.body.task_name

    await patchTaskName.validate({ task_id, task_name })
        .then(async () => {
            const task = await taskExist(task_id)
            if (!task) {
                res.status(400).json({ error: true, message: "Task doesn't exist" })
                return
            }

            await prisma.$queryRaw`exec Tempus.spUpdateTaskName ${task_id}, ${task_name}`
            res.status(200).json({ error: false, message: "Task succesfully updated" })
        })
        .catch((err) => {
            res.status(400).json({
                error: 'true', message: `${err.message}`
            })
        })


})

exports.patchTaskDescription = (('/'), async (req, res) => {
    const task_id = req.body.task_id
    const task_description = req.body.task_description

    await patchTaskDescription.validate({ task_id, task_description })
        .then(async () => {
            const task = await taskExist(task_id)
            if (!task) {
                res.status(400).json({ error: true, message: "Task doesn't exist" })
                return
            }

            await prisma.$queryRaw`exec Tempus.spUpdateTaskDescription ${task_id}, ${task_description}`
            res.status(200).json({ error: false, message: "Task succesfully updated" })
        })
        .catch((err) => {
            res.status(400).json({
                error: 'true', message: `${err.message}`
            })
        })

})


exports.patchTaskSituation = (('/'), async (req, res) => {
    const task_id = req.body.task_id
    const task_situation = req.body.task_situation

    await patchTaskSituation.validate({ task_id, task_situation })

        .then(async () => {
            const task = await taskExist(task_id)
            if (!task) {
                res.status(400).json({ error: true, message: "Task doesn't exist" })
                return
            }

            await prisma.$queryRaw`exec Tempus.spUpdateTaskSituation ${task_id}, ${task_situation}`
            res.status(200).json({ error: false, message: "Task succesfully updated" })
        })
        .catch((err) => {
            res.status(400).json({
                error: 'true', message: `${err.message}`
            })
        })

})

exports.patchTaskCategory = (('/'), async (req, res) => {
    const task_id = req.body.task_id
    const task_category = req.body.task_category

    await patchTaskCategory.validate({ task_id, task_category })

        .then(async () => {
            const task = await taskExist(task_id)
            if (!task) {
                res.status(400).json({ error: true, message: "Task doesn't exist" })
                return
            }


            if (!(await prisma.category.findUnique({where: {category_id: task_category}})) ){
                res.status(400).json({error: true, message: "Category doesn't exist"})
                return
            }


            await prisma.$queryRaw`exec Tempus.spUpdateTaskCategory ${task_id}, ${task_category}`
            res.status(200).json({ error: false, message: "Task succesfully updated" })
        })
        .catch((err) => {
            res.status(400).json({
                error: 'true', message: `${err.message}`
            })
        })

})

exports.patchTaskEnd = (('/'), async (req, res)=> {
    const task_id = req.body.task_id
    const task_end = new Date(req.body.task_end)

    await patchTaskEnd.validate({ task_id, task_end })

        .then(async () => {
            const task = await taskExist(task_id)
            if (!task) {
                res.status(400).json({ error: true, message: "Task doesn't exist" })
                return
            }

            await prisma.$queryRaw`exec Tempus.spUpdateTaskEnd ${task_id}, ${task_end}`
            res.status(200).json({ error: false, message: "Task succesfully updated" })
        })
        .catch((err) => {
            res.status(400).json({
                error: 'true', message: `${err.message}`
            })
        })
}) 

module.exports 