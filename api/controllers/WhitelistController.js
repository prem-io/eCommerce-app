const express = require("express")
const router = express.Router()

const { authenticateUser } = require('../middleware/authenticateUser')
const { Whitelist } = require('../models/Whitelist')

router.get("/", authenticateUser, (req, res) => {
    Whitelist.find({user: req.user._id}).populate("product")
        .then(product => { res.send(product) })
        .catch(err => { res.send(err) })
})

router.post("/", authenticateUser, (req, res) => {
    const whitelist = new Whitelist({
        user: req.user._id,
        product: req.body.product
    })
    whitelist.save()
        .then(whitelist => { res.send(whitelist) })
        .catch(err => { res.send(err) })
})

module.exports = {
    whitelistRouter: router
}