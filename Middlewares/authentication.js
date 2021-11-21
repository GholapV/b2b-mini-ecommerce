const jwt = require('jsonwebtoken')
const OwnerModel = require('../Models&Schemas/owner')
const UserModel = require('../Models&Schemas/user')
const { UnAuthorized } = require('../Errors')


//Authentication setup to check token 

const Authentication = async (req, res, next) => {
    const auth = req.headers.authorization

    if (auth && auth.startsWith('Bearer ') && !auth.startsWith('Bearer null')) {
        const token = auth.split(' ')[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const { id, email, name } = decoded

        // to check if a forged token is used to get access
        if (req.url.startsWith('/store')) {

            const value = await OwnerModel.findById({ _id: id, email, name })

            if (!value) throw new UnAuthorized('not authorized to use this route')
        }

        if (req.url.startsWith('/place-order') || req.url.startsWith('/cart')) {

            const value = await UserModel.findById({ _id: id, email, name })

            if (!value) throw new UnAuthorized('not authorized to use this route')
            req.user = { id, email, name }
        }
        next()
    } else throw new UnAuthorized('no token present, please register or log-in')
}

module.exports = Authentication;