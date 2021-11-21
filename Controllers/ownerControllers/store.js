const { StoreModel } = require('../../Models&Schemas/product')
const OrderModel = require('../../Models&Schemas/orders')
const { StatusCodes } = require('http-status-codes')
const { NotFound } = require('../../Errors')

const CreateProduct = async (req, res) => {
    await StoreModel.insertMany(req.body)
    res.status(StatusCodes.CREATED).json({ msg: 'successfully added to the store' })
}

const GetAllProducts = async (req, res) => {
    const store = await StoreModel.find({})
    if (!store.length)
        res.status(StatusCodes.OK).json({ msg: 'store is empty' })
    else
        res.status(StatusCodes.OK).json({ counts: store.length, store })
}

const DeleteProduct = async (req, res) => {
    const { id } = req.params
    const deleted = await StoreModel.findByIdAndDelete({ _id: id })

    if (!deleted) throw new NotFound(`product with id:${id} not found`)
    res.status(StatusCodes.OK).json({ msg: `product with id:${id} successfully deleted` })
}

const GetOrders = async (req, res) => {
    const orders = await OrderModel.find({})
    if (!orders.length)
        res.status(StatusCodes.OK).json({ msg: 'no orders received yet' })
    else
        res.status(StatusCodes.OK).json({ ordersReceived: orders })
}

module.exports = { CreateProduct, GetAllProducts, DeleteProduct, GetOrders }