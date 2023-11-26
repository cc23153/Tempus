require('dotenv').config()
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

const validateToken = (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        res.status(401).json({ error: true, message: 'Unauthorized' })
        return
    }
    try {
        const decoded = jwt.verify(token, SECRET)

        if (req.username = decoded.payload.username) {
            res.status(401).send({ error: true, message: 'username does not match with token username' })
            return
        }
        next()
    } catch (error) {
        res.status(401).send({ error: true, message: 'invalid token' })
    }
}

module.exports = validateToken
