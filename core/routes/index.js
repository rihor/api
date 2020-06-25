const { Router } = require('express')

const routes = Router()

routes.use('/images', require('./images.routes'))
routes.use('/user', require('./user.routes'))

module.exports = routes