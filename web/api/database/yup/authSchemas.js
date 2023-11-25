const yup = require('yup')

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

const pwd = yup.string().strict(true)
                 .required().nonNullable()
                 .defined().max(128)

exports.signupSchema = yup.object().shape({
    username: username, 
    nickname: nickname,
    email: email,
    pwd: pwd
})

// exports.loginSchema = yup.object().shape({
//     username: username.optional(),
//     email: email.optional(),
//     pwd: pwd.required(true)
// })

exports.loginSchema = yup.object().shape({
    username: username,
    pwd: pwd
})