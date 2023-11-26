require('dotenv').config()
const jwt = require('jsonwebtoken')

const SECRET = process.env.SECRET
const maxTime = '7d'

exports.generateJWT = (payload) => {
    return jwt.sign({payload}, SECRET, {
        expiresIn: maxTime
    })
}

module.exports