const mongoose = require('mongoose')
const Schema =  mongoose.Schema

const ReviewSchema = new Schema({
    description: {
        type: String
    },
    ratings: {
        type: Number
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product" 
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Review = mongoose.model("Review", ReviewSchema)

module.exports = {
    Review
}