const yup = require('yup')

const comment_id = yup.number()




                .positive('comment_id must be a positive number')
                .required('comment_id is required')
                .defined('comment_id must be defined')
                .nonNullable('comment_id can\'t be null')

const task_id = yup.number()
                .positive('task_id must be a positive number')
                .required('task_id is required')
                .defined('task_id must be defined')
                .nonNullable('task_id cant\'t be null')

const content = yup.string()
                .strict(true)
                .typeError('content must be a string')
                .required('content is required')
                .nonNullable('content can\'t be null')
                .min(0)

const comment_datetime = yup.date()
                .nonNullable('comment_datetime can\'t be null')
                .required('comment_datetime is required')
                .typeError('comment_datetime must be a date')
                .defined('comment_datetime must be defined')

const user_id = yup.number()
                .positive('user_id must be a positive number')
                .required('user_id is required')
                .defined('user_id must be defined')
                .nonNullable('user_id can\'t be null')


exports.getComment = yup.object().shape({
    comment_id : comment_id
})

exports.postComment = yup.object().shape({
    task_id : task_id,
    content : content,
    comment_datetime : comment_datetime,
    user_id : user_id
})

exports.putComment = yup.object().shape({
    comment_id : comment_id,
    task_id : task_id,
    content : content,
    comment_datetime : comment_datetime,
    user_id : user_id
})

exports.deleteComment = yup.object().shape({
    comment_id : comment_id
})

exports.patchCommentContent = yup.object().shape({
    comment_id : comment_id,
    content : content
})