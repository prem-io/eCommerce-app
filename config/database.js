const mongoose = require('mongoose')
const CONNECTION_URI = 'mongodb://localhost:27017/eCommerce-App'

mongoose.Promise = global.Promise

mongoose.connect(CONNECTION_URI, { useNewUrlParser: true })
    .then(() => { console.log('connected to db...')})
    .catch(() => { console.log('error connecting to db...')})

module.exports = mongoose