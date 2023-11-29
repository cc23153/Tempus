const yup = require('yup')

const teammembers_id = yup.number().positive('teammembers_id must be a positive number')
                        .required('teammembers_id is required').defined('teammembers_id must be defined')
                        .nonNullable('teammembers_id can\'t be null')

const team_id = yup.number().positive('team_id must be a positive number')
                .required('team_id is required').defined('team_id must be defined')
                .nonNullable('team_id can\'t be null')

const user_id = yup.number().positive('user_id must be a positive number')
                .required('user_id is required').defined('user_id must be defined')
                .nonNullable('user_id can\'t be null')

exports.getTeamMemberSchema = yup.object().shape({
    teammembers_id: teammembers_id
})

exports.postTeamMemberSchema = yup.object().shape({
    team_id: team_id,
    user_id: user_id
})

exports.deleteTeamMemberSchema = yup.object().shape({
    team_id: team_id,
    user_id: user_id
})