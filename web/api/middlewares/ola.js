const ola  = (req, res, next) => {
    console.log("Middleware teste foi executado")
    next()
}

module.exports = ola


