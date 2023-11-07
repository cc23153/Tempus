const yup = require('yup')


const user_id = yup.number().positive('user_id must be a positive number')
                .required('user_id is required').defined('user_id must be defined')
                .nonNullable('user_id can\'t be null')
const username = yup.string().strict(true).
                 typeError('username must be a string').required()
                 .nonNullable().min(5).max(20)
const nickname = yup.string().required()
                 .strict(true).typeError('username must be a string')
                 .nonNullable().min(1)
                 .max(40)
const email = yup.string().strict(true)
            .typeError('email must be a string').required()
            .nonNullable().defined()
            .max(128).email()
const pwd_hash = yup.string().strict(true)
                 .typeError('pwd_hash must be a string').required()
                 .nonNullable().defined()
                 .max(64)
const pwd_salt = yup.string().strict(true)
                 .typeError('pwd_salt must be a string').required()
                 .nonNullable().defined()
                 .max(64)


exports.getUserSchema = yup.object().shape({
    username: username
})

exports.getUserTeams = yup.object().shape({
    user_id: user_id
})

exports.postUserSchema = yup.object().shape({
    username: username, 
    nickname: nickname,
    email: email,
    pwd_hash: pwd_hash, 
    pwd_salt: pwd_salt,
})

exports.deleteUserSchema = yup.object().shape({
    user_id: user_id
})

exports.patchUsernameSchema = yup.object().shape({
    user_id: user_id,
    username: username
});

exports.patchNicknameSchema = yup.object().shape({
    user_id: user_id,
    nickname: nickname  
})

exports.patchEmailSchema = yup.object().shape({
    email: email
})

exports.patchPasswordSchema = yup.object().shape({
    pwd_hash: pwd_hash,
    pwd_salt: pwd_salt
})

exports.putUser = yup.object().shape({
    user_id: user_id,
    username: username,
    nickname: nickname,
    email: email
})

module.exports