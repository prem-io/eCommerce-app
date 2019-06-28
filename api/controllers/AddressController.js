const express = require('express')
const router = express.Router()

const Address = require('../models/Address')

router.post('/add', (req, res) => {
    const body = req.body
    const address = new Address(body)
    address.save()
        .then(address => { res.send(address) })
        .catch(err => { res.send(err) })
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const body = req.body
    Address.findOneAndUpdate({ _id: id }, { $set: body }, { new: true, runValidators: true })
        .then(address => {res.send(address) })
        .catch(err => { res.send(err) })
})

module.exports = {
    addressRouter: router
}