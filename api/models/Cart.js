const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        default: 1,
        min: 1,
        max: 5
    }
})

const Cart = mongoose.model('Cart', CartSchema)

module.exports = {
    Cart,
    CartSchema
}