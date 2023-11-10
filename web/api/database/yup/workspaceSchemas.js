const yup = require('yup')

const workspace_id = yup.number().positive('workspace_id must be a positive number')
                .required('workspace_id is required').defined('workspace_id must be defined')
                .nonNullable('workspace_id can\'t be null')

const workspace_name =  yup.string().strict(true)
                        .typeError('workspace_name must be a string').required('workspace_name is required')
                        .nonNullable('workspace_name can\'t be null').min(3).max(50)

const workspace_description = yup.string().strict(true)
                              .typeError('workspace_description must be a string').required('workspace_description is required')
                              .nonNullable('workspace_description can\'t be null').min(0).max(128)


const team_id = yup.number().positive('team_id must be a positive number')
                .required('team_id is required').defined('team_id must be defined')
                .nonNullable('team_id can\'t be null')

const workspace_admin = yup.number().positive('workspace_admin must be a positive number')
                        .required('workspace_admin is required').defined('workspace_admin must be defined')
                        .nonNullable('workspace_admin can\'t be null')

exports.getSchema = yup.object().shape({
    workspace_id: workspace_id
})

exports.postSchema = yup.object().shape({
    workspace_name: workspace_name,
    workspace_description: workspace_description,
    workspace_admin: workspace_admin,
    team_id: team_id
})

exports.putSchema = yup.object().shape({
    workspace_id: workspace_id,
    workspace_name: workspace_name,
    workspace_description: workspace_description,
    workspace_admin: workspace_admin
})

exports.deleteSchema = yup.object().shape({
    workspace_id: workspace_id
})

exports.patchNameSchema = yup.object().shape({
    workspace_id: workspace_id,
    workspace_name: workspace_name
})

exports.patchDescriptionSchema = yup.object().shape({
    workspace_id: workspace_id,
    workspace_description: workspace_description
})

exports.patchAdminSchema = yup.object().shape({
    workspace_id: workspace_id,
    workspace_admin: workspace_admin
})

module.exports