const express = require('express')
const app = express()

const PORT = 5000

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.listen(PORT, () => {
    console.log(`Server running under port ${PORT} | ${new Date()}`)
})

app.get('/', (req, res) => {
    res.send("<h1>Hello, World!</h1>")
})