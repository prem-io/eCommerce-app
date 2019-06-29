const express = require("express")
const router = express.Router()

const Category = require('../models/Category')

router.get('/', (req, res) => {
    Category.find()
        .then(categories => { res.send(categories) })
        .catch(err => { res.send(err) })
})

router.post('/', (req, res) => {
    const body = req.body
    const category = new Category(body)
    category.save()
        .then(category => { res.send(category) })
        .catch(err => { res.send(err) })
})

module.exports = {
    categoryRouter: router
}