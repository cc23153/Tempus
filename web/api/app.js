const express = require('express')
const router = require('./routes/router')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()

const API_PORT = process.env.API_PORT
const FRONTEND_PORT = process.env.FRONTEND_PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const corsOptions = {
  origin: [`http://localhost:${FRONTEND_PORT}`, 'http://localhost:5173'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
};

app.use(cors(corsOptions))

app.use('/', router)

app.listen(API_PORT, () => {
    console.log(`Server running under port ${API_PORT} | ${new Date()}`)
})