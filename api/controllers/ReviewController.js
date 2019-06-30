const express = require("express")
const router = express.Router()

const { authenticateUser } = require('../middleware/authenticateUser')
const { authorizeUser } = require('../middleware/authorizeUser')
const { Review } = require('../models/Review')

router.get("/", authenticateUser, (req,res) => {
    const id = req.user._id
    console.log({ user: id })
    Review.find({ user: id }).populate("product")
        .then(review => { res.send(review) })
        .catch(err => { res.send(err) })
})

router.post("/", authenticateUser, (req, res) => {
    const user = req.user
    const body = req.body
    const review = new Review({
        description: body.description,
        ratings: body.ratings,
        user: user._id,
        product: body.product
    })
    review.save()
        .then(review => { res.send(review) })
        .catch(err => { res.send(err) })
})

router.put("/:id", authenticateUser, (req, res) => {
    const id = req.params.id
    const user = req.user
    const body = req.body
    Review.findOneAndUpdate({ _id: id, user: user._id}, { $set: body }, { new: true, runValidators: true})
        .then(review => { res.send(review) })
        .catch(err => { res.send(err) })
})

router.delete("/:id", authenticateUser, authorizeUser, (req, res) => {
    const id = req.params.id
    const user = req.user
    Review.findOneAndDelete({ _id: id, user: user._id})
        .then(review => { res.send(review) })
        .catch(err => { res.send(err) })
})

module.exports = {
    reviewRouter: router
}