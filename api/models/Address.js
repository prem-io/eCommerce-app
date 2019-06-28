const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AddressSchema = new Schema({
    street: {
        type: String
    },
    landmark: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    pin: {
        type: Number,
        minlength: 6,
        maxlength: 6
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const Address = mongoose.model("Address", AddressSchema)

module.exports = Address