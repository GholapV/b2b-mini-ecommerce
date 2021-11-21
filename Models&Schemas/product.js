const mongoose = require('mongoose')

const validate = (url) => {
    var expression = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
    return expression.test(url)
}

const ProductSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Types.ObjectId
    },
    product_id: {
        type: mongoose.Types.ObjectId
    },
    product_name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: 10,
        required: true
    },
    image: {
        type: String,
        validate: [validate, 'please add valid url']
    },
    rating: {
        type: Number,
        max: 5
    }
}, { timestamps: true })


mongoose.pluralize(null);
const StoreModel = mongoose.model('store', ProductSchema)
const CartModel = mongoose.model('cart', ProductSchema)

module.exports = { StoreModel, CartModel }