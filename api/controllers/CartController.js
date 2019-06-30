const express = require('express')
const router = express.Router()

const { authenticateUser } = require('../middleware/authenticateUser')
const { Cart } = require("../models/Cart")
const { User } = require("../models/User")

router.get("/", authenticateUser, (req, res) => {
    const id = req.user._id
    User.findOne(id).select("carts").populate("carts.product")
        .then(cart => { res.send(cart) })
        .catch(err => { res.send(err) })
})

router.post("/", authenticateUser, (req, res) => {
    let product = false
    const body = req.body
    const user = req.user

    const cart = new Cart({ user: user._id, product: body.product })
    
    user.carts.map(item => {
        console.log(item.product, body.product)
        if(item.product == body.product) {
            product = true
        }
    })

    if(product) {
        res.send({ status: "Product is already added to cart" });
    } else {
        user.carts.push(cart)
        user.save()
            .then(user => { res.send({ statusText: "Added Succssfully" })})
            .catch(err => { res.send(err) })
    }
})

router.put("/:id", authenticateUser, (req, res) => {
    const id = req.params.id
    const user = req.user
    const body = req.body
    
    user.carts.map(cart => {
        if(cart._id == id) {
            cart.quantity = body.quantity
        }
    })

    user.save()
        .then(user => { res.send({ statusText: "succefully Updated" }) })
        .catch(err => { res.send(err) })
})

router.delete("/:id", authenticateUser, (req, res) => {
    const id = req.params.id
    const user = req.user
    user.carts = user.carts.filter(cart => cart._id != id)

    user.save()
        .then(user => { res.send({ statusText: "successfully deleted" })})
        .catch(err => { res.send(err)})
})

module.exports = {
    cartRouter: router
}