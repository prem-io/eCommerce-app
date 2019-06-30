const express = require("express")
const router = express.Router()

const { authenticateUser } = require('../middleware/authenticateUser')
const { Order } = require('../models/Order')
const { User } = require('../models/User')

router.get("/", authenticateUser, (req, res) => {
    const id = req.user._id
    User.find(id).select("order.lineItems").populate("order.lineItems.product")
        .then(order => { res.send(order)})
        .catch(err => { res.send(err) })
})

router.get("/:id", authenticateUser, (req, res) => {
    const id = req.params.id
    const user = req.user
    User.findOne({ _id: user._id, "order._id": id }).select("order")
        .then(order => { res.send(order)})
        .catch(err => { res.send(err) })
})

router.post("/", authenticateUser, (req, res) => {
    const user = req.user
    const body = req.body

    body.orderNumber = "XYZ-"+ Math.round(Math.random() * 100000)
    body.user = user._id
    body.totalOrders = user.carts.length
    body.lineItems = []

    User.findOne({ _id: user._id }).select("carts").populate("carts.product")
        .then(result => {
            result.carts.forEach(cart => {
                body.lineItems.push({
                    product: cart.product._id,
                    quantity: cart.quantity,
                    price: cart.product.price
                })
            })

            const order = new Order(body)

            if(result.carts.length != 0) {
                user.order.push(order)
                user.carts = []
            } else {
                res.send({ statusText: "There is no order you have made."})
            }
            user.save()
                .then(user => { res.send(user) })
                .catch(err => { res.send(err) })
        })
        .catch(err => { res.send(err) })
})

module.exports = {
    orderRouter: router
}