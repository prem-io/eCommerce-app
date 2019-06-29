const express = require("express")
const router = express.Router()

const Category = require('../models/Category')
const { authenticateUser } = require('../middleware/authenticateUser')
const { authorizeUser } = require('../middleware/authorizeUser')

router.get('/', (req, res) => {
    Category.find()
        .then(categories => { res.send(categories) })
        .catch(err => { res.send(err) })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    Category.findById(id)
        .then((category) => {
            res.send(category)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.post('/', authenticateUser, authorizeUser, (req, res) => {
    const body = req.body
    const category = new Category(body)
    category.save()
        .then(category => { res.send(category) })
        .catch(err => { res.send(err) })
})

// router.put('/:id', authenticateUser, authorizeUser, (req, res) => {
//     const id = req.params.id
//     const body = req.body
//     Category.findOneAndUpdate({ user: req.user._id, _id: id }, { $set: body }, { new: true, runValidators: true })
//         .then((category) => {
//             if(!category){
//                 res.send({})
//             }
//             res.send(category)
//         })
//         .catch((err) => {
//             res.send(err)
//         })
// })

// router.delete('/:id', authenticateUser, authorizeUser, (req, res) => {
//     const id = req.params.id
//     Category.findByIdAndDelete({ user: user._id, _id: id})
//         .then(category => { res.send(category) })
//         .catch(err => { res.send(err) })
// })

module.exports = {
    categoryRouter: router
}