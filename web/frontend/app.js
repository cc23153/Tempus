require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

const express = require('express')
const path = require('path')
const app = express()

const PORT = 5000

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.listen(PORT, () => {
    console.log(`Server running under port ${PORT} | ${new Date()}`)
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/inicio.html'))
})
app.get('/signUp', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/signUp.html'))
})
app.get('/signIn', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/signIn.html'))
})