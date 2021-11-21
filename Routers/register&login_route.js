const express = require('express')
const ExpressRouter = express.Router()

const { Register, Login } = require('../Controllers/reg&login')

ExpressRouter.route('/owner/register').post(Register)
ExpressRouter.route('/owner/login').post(Login)

ExpressRouter.route('/user/register').post(Register)
ExpressRouter.route('/user/login').post(Login)

module.exports = ExpressRouter;
