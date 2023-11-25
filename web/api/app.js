const express = require('express')
const router = require('./routes/router')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()

const PORT = process.env.API_PORT
const FRONTEND_PORT = process.env.FRONTEND_PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const corsOptions = {
  origin: `http://localhost:${FRONTEND_PORT}`,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions))

app.use('/', router)

app.listen(PORT, () => {
    console.log(`Server running under port ${PORT} | ${new Date()}`)
})