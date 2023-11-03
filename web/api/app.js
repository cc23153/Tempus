const express = require('express')
const app = express()

const PORT = 5050

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(PORT, () => {
    console.log(`Server running under port ${PORT} | ${new Date()}`)
})

app.get('/', (req, res) => {
    res.json("Hello, World!")
})