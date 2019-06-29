const express = require('express')
const router = express.Router()
const _ = require('lodash')

const {User} = require('../models/User')
const { authenticateUser } = require('../middleware/authenticateUser')

router.post('/register', (req, res) => {
    const body = req.body
    const user = new User(body)
    // pre-hook --> password encryption
    user.save()
        .then(user => {
            res.send(_.pick(user, ['_id', 'username', 'email', 'createdAt']))
        })
        .catch(err => { res.send(err) })
})

router.post('/login', function(req, res) {
    const body = req.body
    User.findByCredentials(body.email, body.password)
        .then(function(user){
            return user.generateToken()
        })
        .then(function(token){
            res.send({ token })
        })
        .catch(function(err){
            res.send(err)
        })
})

router.get('/account', authenticateUser, function(req, res){
    const { user } = req
    res.send(_.pick(user, ['_id', 'username', 'email', 'createdAt']))
})

router.delete('/logout', authenticateUser, function(req, res){
    const { user, token } = req
    User.findByIdAndUpdate(user._id, { $pull: {tokens: { token: token }}})
        .then(function(){
            res.send({notice: 'successfully logged out'})
        })
        .catch(function(err){
            res.send(err)
        })
})

module.exports = {
    userRouter: router
}