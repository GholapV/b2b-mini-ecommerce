const OwnerModel = require('../Models&Schemas/owner')
const UserModel = require('../Models&Schemas/user')
const { StatusCodes } = require('http-status-codes')
const { BadRequest, UnAuthorized } = require('../Errors')

const Register = async (req, res) => {

    if (req.url === '/owner/register') {
        const registered = await OwnerModel.create(req.body)
        const token = registered.getToken()

        res.status(StatusCodes.CREATED).json({
            id: registered._id,
            owner: { name: registered.name },
            token
        })
    }

    if (req.url === '/user/register') {
        const registered = await UserModel.create(req.body)
        const token = registered.getToken()

        res.status(StatusCodes.CREATED).json({
            id: registered._id,
            user: { name: registered.name },
            token
        })
    }
}

const Login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) throw new BadRequest('incomplete credentials')

    if (req.url === '/owner/login') {
        const owner = await OwnerModel.findOne({ email })

        if (!owner) throw new UnAuthorized('email not registered')

        const match = await owner.comparePassword(password)

        if (!match) throw new UnAuthorized('invalid Credentials')

        const token = owner.getToken()
        res.status(StatusCodes.OK).json({
            id: owner._id,
            owner: { name: owner.name },
            token
        })
    }

    if (req.url === '/user/login') {
        const user = await UserModel.findOne({ email })

        if (!user) throw new UnAuthorized('email not registered')

        const match = await user.comparePassword(password)

        if (!match) throw new UnAuthorized('invalid Credentials')

        const token = user.getToken()
        res.status(StatusCodes.OK).json({
            id: user._id,
            user: { name: user.name },
            token
        })
    }
}

module.exports = { Register, Login }