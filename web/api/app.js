const express = require('express')
const router = require('./routes/router')
const cors = require('cors')
const app = express()

const PORT = 5050

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const corsOptions = {
  origin: 'http://localhost:5000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions))

app.use('/', router)

app.listen(PORT, () => {
    console.log(`Server running under port ${PORT} | ${new Date()}`)
})