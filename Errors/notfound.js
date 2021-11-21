const CustomERR = require("./customerror");
const { StatusCodes } = require('http-status-codes')

class NotFound extends CustomERR {
    constructor(message) {
        super(message)
        this.status = StatusCodes.NOT_FOUND;
    }
}

module.exports = NotFound;