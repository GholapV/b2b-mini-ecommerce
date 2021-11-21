const { NotFound } = require('../../Errors')
const OrderModel = require('../../Models&Schemas/orders')
const { CartModel, StoreModel } = require('../../Models&Schemas/product')
const { StatusCodes } = require('http-status-codes')

const AddItemToCart = async (req, res) => {
    const { id } = req.params

    const product = await StoreModel.findById(id)
    const { _id: product_id, product_name, image, price, rating } = product
    await CartModel.create({
        product_id,
        product_name,
        image, price,
        rating,
        userId: req.user.id
    })

    res.status(StatusCodes.OK).json({ msg: "product successfully added to cart" })
}

const GetCart = async (req, res) => {

    const cart = await CartModel.find({ userId: req.user.id })
    if (!cart.length) throw new NotFound('your cart is empty')
    res.status(StatusCodes.OK).json({ counts: cart.length, yourCart: cart })
}

const PlaceOrder = async (req, res) => {

    const cart = await CartModel.find({ userId: req.user.id })

    if (!cart.length) throw new NotFound('your cart is empty')

    const modifiedCart = cart.map(product => {
        const { product_id, product_name, price: product_price } = product
        return {
            product_id,
            product_name,
            product_price,
            ordered_by: req.user.email
        }
    })
    const placed = await OrderModel.insertMany(modifiedCart)
    await CartModel.deleteMany({
        userId: req.user.id
    })

    res.status(StatusCodes.OK).json({ msg: 'order successfully placed' })
}

const PlacedOrders = async (req, res) => {
    const list = await OrderModel.find({
        ordered_by: req.user.email
    })

    if (!list.length) throw new NotFound('no order placed yet')
    res.status(StatusCodes.OK).json({ yourOrders: list })
}


module.exports = { AddItemToCart, PlaceOrder, GetCart, PlacedOrders }