const mongoose = require('mongoose')
// const Schema = mongoose.Schema

const Category = mongoose.model("Category", new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}))

module.exports = Category