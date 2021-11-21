const CustomERR = require("./customerror");
const { StatusCodes } = require('http-status-codes')

class UnAuthorized extends CustomERR {
    constructor(message) {
        super(message)
        this.status = StatusCodes.UNAUTHORIZED;
    }
}

module.exports = UnAuthorized;