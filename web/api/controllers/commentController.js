const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { getComment, postComment, putComment, deleteComment, patchCommentContent } = require('../database/yup/commentSchemas')
const { postSchema, putSchema, deleteSchema } = require('../database/yup/workspaceSchemas')

const commentExist = async(comment_id) => {
    const comment = await prisma.comment.findUnique({
        where: {
            comment_id : comment_id
        }
    })
    return comment
}

const taskExist = async(task_id) => {
    const task = await prisma.comment.findUnique({
        where: {
            task_id : task_id
        }
    })
    return task
}

const userExist = async(user_id) => {
    const user = await prisma.user.findUnique({
        where: {
            user_id : user_id
        }
    })
    return user
}


exports.getComment = (('/'), async(req, res) => {
    const comment_id = req.body.comment_id

    await getSchema.validate({comment_id})
        .then(async() => {
            const comment = await commentExist(comment_id)
            if (!comment) {
                res.status(400).json({
                    error: 'true', message: "Comment doesn't exist"
                })
                return
            }
            res.status(200).json(comment)
        })
        .catch((err) => {
            res.status(400).json({
                error: 'true', message: `${err.message}`
            })
        })
})


exports.postComment = (('/'), async(req, res) => {
    const task_id = req.body.task_id
    const content = req.body.content
    const comment_datetime = req.body.comment_datetime
    const user_id = req.body.user_id

    await postSchema.validate({task_id, content, comment_datetime, user_id})
    .then(async() => {
        if (!taskExist(task_id)) {
            res.status(400).json({
                error: 'true', message: "Task doesn't exist"
            })
            return
        }
        if (!userExist(user_id)) {
            res.status(400).json({
                error: 'true', message: "User doesn't exist"
            })
            return
        }
        await prisma.$queryRaw`exec Tempus.spNewComment
            ${task_id},
            ${content},
            ${comment_datetime},
            ${user_id}`
        res.status(200).json({
            error: 'false', message: "Comment succesfully inserted"
        })
    })
    .catch((err) => {
        res.status(400).json({
            error: 'true', message: `${err.message}`
        })
    })
})


exports.putComment = ('/', async(req, res) => {
    const comment_id = req.body.comment_id
    const task_id = req.body.task_id
    const content = req.body.content
    const comment_datetime = req.body.comment_datetime
    const user_id = req.body.user_id

    await putSchema.validate({comment_id, task_id, content, comment_datetime, user_id})
    .then(async() => {
        if (!commentExist(comment_id)) {
            res.status(400).json({
                error: 'true', message: "Comment doesn't exist"
            })
            return
        }
        if (!taskExist(task_id)) {
            res.status(400).json({
                error: 'true', message: "Task doesn't exist"
            })
            return
        }
        if (!userExist(user_id)) {
            res.status(400).json({
                error: 'true', message: "User doesn't exist"
            })
            return
        }
        await prisma.$queryRaw`exec Tempus.spUpdateComment
            ${comment_id},
            ${task_id},
            ${content},
            ${comment_datetime},
            ${user_id}`
        res.status(200).json({
            error: 'false', message: "Comment succesfully updated"
        })
    })
    .catch((err) => {
        res.status(400).json({
            error: 'true', message: `${err.message}`
        })
    })
})


exports.deleteComment = ('/', async(req, res) => {
    const comment_id = req.body.comment_id

    await deleteSchema.validate({comment_id})
    .then(async() => {
        if (!commentExist(comment_id)) {
            res.status(400).json({
                error: 'true', message: "Comment doesn't exist"
            })
            return
        }
        await prisma.$queryRaw`exec Tempus.spDeleteComment
            ${comment_id}`
        res.status(200).json({
            error: 'false', message: "Comment succesfully deleted"
        })
    })
    .catch((err) => {
        res.status(400).json({
            error: 'true', message: `${err.message}`
        })
    })
})


exports.patchCommentContent = ('/', async(req, res) => {
    const comment_id = req.body.comment_id
    const content = req.body.content

    await patchContentSchema.validate({comment_id, content})
    .then(async() => {
        if (!commentExist(comment_id)) {
            res.status(400).json({
                error: 'true', message: "Comment doesn't exist"
            })
            return
        }
        await prisma.$queryRaw`exec Tempus.spUpdateCommentContent
            ${comment_id},
            ${content}`
        res.status(200).json({
            error: 'false', message: "Comment succesfully updated"
        })
    })
    .catch((err) => {
        res.status(400).json({
            error: 'true', message: `${err.message}`
        })
    })
})


module.exports