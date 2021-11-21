const { StatusCodes } = require('http-status-codes')

const Route_Notfound = (req, res) => {
    res.status(StatusCodes.NOT_FOUND).send(`OOPS...route ${req.url} doesn\'t exist`)
}

module.exports = Route_Notfound;