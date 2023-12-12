const yup = require('yup')

const task_id =  yup.number().positive('task_id must be a positive number')
                .required('task_id is required').defined('task_id must be defined')
                .nonNullable('task_id can\'t be null')
const task_name = yup.string().strict(true).
                typeError('task_name must be a string').required()
                .nonNullable().min(5).max(50)
const task_description = yup.string().strict(true)
                         .typeError('task_description must be a string').required()
                         .nonNullable().min(5).max(512)
const workspace_id =  yup.number().positive('workspace_id must be a positive number')
                         .required('workspace_id is required').defined('workspace_id must be defined')
                         .nonNullable('workspace_id can\'t be null')
const task_situation = yup.string().strict(true)
                       .typeError('task_situation must be a string').required('task_situation is required')
                       .nonNullable().min(5).max(50) 
const task_image = yup.string().strict(true)
                   .typeError('task_image must be a string')
                   .nullable().max(2000)
const task_begin = yup.date()
                   .nonNullable('task_begin can\'t be null').required('task_begin is required')
                   .typeError('task_begin must be a date').defined('task_begin must be defined')
const task_end = yup.date()
                 .nonNullable('task_end can\'t be null').required('task_end is required')
                 .typeError('task_end must be a date').defined('task_end must be defined')
const task_category =  yup.number().positive('task_category must be a positive number')
                 .required('task_category is required').defined('task_category must be defined')
                 .nonNullable('task_category can\'t be null')



exports.getTask = yup.object().shape({
    task_id : task_id
})
exports.getTaskByWorkspace = yup.object().shape({
    workspace_id: workspace_id
})

exports.postTask = yup.object().shape({
    task_name: task_name,
    task_description: task_description,
    task_situation: task_situation,
    task_image: task_image,
    workspace_id: workspace_id,
    task_begin: task_begin,
    task_end: task_end,
    task_category: task_category
})

exports.putTask = yup.object().shape({
    task_id: task_id,
    task_name: task_name,
    task_description: task_description,
    task_situation: task_situation,
    task_image: task_image,
    workspace_id: workspace_id,
    task_begin: task_begin,
    task_end: task_end,
    task_category: task_category
})

exports.deleteTask = yup.object().shape({
    task_id: task_id
})

exports.patchTaskName = yup.object().shape({
    task_id: task_id,
    task_name: task_name
})

exports.patchTaskDescription = yup.object().shape({
    task_id: task_id,
    task_description: task_description
})

exports.patchTaskSituation = yup.object().shape({
    task_id: task_id,
    task_situation: task_situation
})

exports.patchTaskCategory = yup.object().shape({
    task_id: task_id,
    task_category: task_category
})

exports.patchTaskEnd = yup.object().shape({
    task_id: task_id,
    task_end: task_end
})

exports.patchTaskImage = yup.object().shape({
    task_id: task_id,
    task_image: task_image
})

                    