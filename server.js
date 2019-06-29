const express = require('express')
const app = express()
const port = 3001

const mongoose = require('./config/database')

const { userRouter } = require('./api/controllers/UsersController')
<<<<<<< HEAD
const { addressRouter } =require('./api/controllers/AddressController')
=======
const { categoryRouter } = require('./api/controllers/CategoryController')
>>>>>>> category

app.use(express.json())

app.use('/users', userRouter)
<<<<<<< HEAD
app.use('/address', addressRouter)
=======
app.use('/categories', categoryRouter)
>>>>>>> category

app.get('/', (req, res) => {
    res.send("eCommerce Application...")
})

app.listen(port, () => {
    console.log("server connected at:", port)
})