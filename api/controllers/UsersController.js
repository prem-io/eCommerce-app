const express = require('express')
const router = express.Router()

const User = require('../models/User')

router.post('/register', (req, res) => {
    const body = req.body
    const user = new User(body)
    user.save()
        .then(user => { res.send(user) })
        .catch(err => { res.send(err) })
})

module.exports = {
    userRouter: router
}