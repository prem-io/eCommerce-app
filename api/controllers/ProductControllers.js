const express = require('express')
const router = express.Router()

const { authenticateUser } = require('../middleware/authenticateUser')
const { authorizeUser } = require('../middleware/authorizeUser')
const Product = require('../models/Products')

router.get("/", (req, res) => {
    Product.find().populate("category")
        .then(products => { res.send(products) })
        .catch(err => { res.status(500).send({ status: "internal server issue" }) })
})

router.get("/:id", (req, res) => {
    const id = req.params.id
    Product.findById(id).populate("category")
        .then(products => { res.send(products) })
        .catch(err => { res.status(500).send({ status: "internal server issue" }) })
})

router.post("/", authenticateUser, authorizeUser, (req, res) => {
    const body = req.body
    const product = new Product(body)
    product.save()
        .then(product => { res.send(product) })
        .catch(err => { res.status(500).send({ status: "internal server issue" }) })
})

router.put('/:id', authenticateUser, authorizeUser, (req, res) => {
    const id = req.params.id
    const body = req.body
    Product.findByIdAndUpdate({ _id: id }, { $set: body }, { new: true, runValidators: true })
        .then(product => res.send(product))
        .catch(err => res.send(err))
})

router.delete("/:id", authenticateUser, authorizeUser, (req, res) => {
    const id = req.params.id
    Product.findByIdAndDelete(id)
        .then(product => { res.send(product) })
        .catch(err => { res.status(500).send({ status: "internal server issue" }) })
})

module.exports = {
    productRouter: router
}