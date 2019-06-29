const authorizeUser = function(req, res, next) {
    const { user } = req
    const isAdmin = user.isAdmin
    if(isAdmin) {
        next()
    } else {
        res.status('401').send({ notice: 'unauthorized action'})
    }
}

module.exports = {
    authorizeUser
}