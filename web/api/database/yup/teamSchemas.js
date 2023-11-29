const yup = require('yup')

const team_id = yup.number()
                .positive('team_id must be a positive number')
                .required('team_id is required')
                .defined('team_id must be defined')
                .nonNullable('team_id can\'t be null')

const team_name = yup.string()
                .strict(true)
                .typeError('team_name must be a string')
                .required('team_name is required')
                .nonNullable('team_name can\'t be null')
                .min(0)


exports.getTeam = yup.object().shape({
    team_id : team_id
})

exports.postTeam = yup.object().shape({
    team_name : team_name
})

exports.putTeam = yup.object().shape({
    team_id : team_id,
    team_name : team_name
})

exports.deleteTeam = yup.object().shape({
    team_id : team_id
})