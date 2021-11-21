const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Types.ObjectId,
        ref: 'UserModel'
    },
    product_name: {
        type: String
    },
    product_price: {
        type: Number
    },
    ordered_by: {
        type: String
    },
    ordered_on: {
        type: Date,
        default: new Date().getDate()
    }
}, { timestamps: true })

module.exports = mongoose.model('orders', OrderSchema)