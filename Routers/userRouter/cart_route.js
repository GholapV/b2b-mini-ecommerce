const express = require('express')
const ExpressRouter = express.Router()
const { AddItemToCart, PlaceOrder, GetCart, PlacedOrders } = require('../../Controllers/userControllers/cart')

ExpressRouter.route('/place-order').post(PlaceOrder).get(PlacedOrders)
ExpressRouter.route('/cart/:id').post(AddItemToCart)
ExpressRouter.route('/cart').get(GetCart)

module.exports = ExpressRouter;