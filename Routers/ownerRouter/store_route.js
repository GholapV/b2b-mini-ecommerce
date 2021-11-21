const express = require('express')
const ExpressRouter = express.Router()
const Authentication = require('../../Middlewares/authentication')

const {
    CreateProduct,
    GetAllProducts,
    DeleteProduct,
    GetOrders
} = require('../../Controllers/ownerControllers/store')

ExpressRouter.route('/store/orders').get(Authentication, GetOrders)
ExpressRouter.route('/store').post(Authentication, CreateProduct).get(GetAllProducts)
ExpressRouter.route('/store/:id').delete(Authentication, DeleteProduct)

module.exports = ExpressRouter;