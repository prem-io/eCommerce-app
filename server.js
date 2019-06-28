const express = require('express')
const app = express()
const port = 3001

const mongoose = require('./config/database')
const { userRouter } = require('./api/controllers/UsersController')

app.use(express.json())

app.use('/users', userRouter)

app.get('/', (req, res) => {
    res.send("eCommerce Application...")
})

app.listen(port, () => {
    console.log("server connected at:", port)
})