const CustomERR = require("./customerror");
const { StatusCodes } = require('http-status-codes')

class BadRequest extends CustomERR {
    constructor(message) {
        super(message)
        this.status = StatusCodes.BadRequest;
    }
}

module.exports = BadRequest;