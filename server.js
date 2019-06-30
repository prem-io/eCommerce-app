const express = require('express')
const app = express()
const port = 3001

const mongoose = require('./config/database')

const { userRouter } = require('./api/controllers/UsersController')

const { categoryRouter } = require('./api/controllers/CategoryController')
const { addressRouter } = require('./api/controllers/AddressController')
const { productRouter } = require('./api/controllers/ProductControllers')

app.use(express.json())

app.use('/users', userRouter)
app.use('/address', addressRouter)
app.use('/categories', categoryRouter)
app.use('/products', productRouter)

app.get('/', (req, res) => {
    res.send("eCommerce Application...")
})

app.listen(port, () => {
    console.log("server connected at:", port)
})