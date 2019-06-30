const mongoose = require("mongoose")
const Schema = mongoose.Schema

const WhitelistSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    }
})

const Whitelist = mongoose.model("Whitelist", WhitelistSchema)

module.exports = {
    Whitelist
}