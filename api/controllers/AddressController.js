const express = require('express')
const router = express.Router()

const Address = require('../models/Address')
const { authenticateUser } = require('../middleware/authenticateUser')

router.get('/', authenticateUser, (req, res) => {
    const { user } = req
    Address.find({ user: user._id})
    .then(address => res.json(address))
    .catch(err => res.json(err)) 
})

router.post('/', authenticateUser, (req, res) => {
    const { user } = req
    const body = req.body
    const address = new Address(body)
    address.user = user._id
    address.save()
        .then(address => { res.send(address) })
        .catch(err => { res.send(err) })
})

router.put('/:id', authenticateUser, (req, res) => {
    const id = req.params.id
    const body = req.body
    Address.findOneAndUpdate({ _id: id, user: req.user._id }, { $set: body }, { new: true, runValidators: true })
        .then(address => {
            if(!address){
                res.send({})
            }
            res.send(address)
        })
        .catch(err => { res.send(err) })
})

router.delete(':/id', authenticateUser, (req, res) => {
    const id = req.params.id
    Address.findOneAndDelete({ _id: id, user: req.user._id})
        .then(address => {
            if(!address) {
                res.send({})
            }
            res.send(address)
        })
        .catch(err => { res.send(err) })
})

module.exports = {
    addressRouter: router
}