const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    orderNumber: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: "Address"
    },
    totalOrders: {
        type: Number,
        required: true
    },
    lineItems: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number
            },
            price: {
                type: Number
            }
        }
    ],
    orderAt: {
        type: Date,
        default: Date.now()
    }

})

const Order = mongoose.model("Order", OrderSchema)

module.exports = {
    Order,
    OrderSchema
}