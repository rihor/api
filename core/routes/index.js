const { Router } = require('express')

const routes = Router()

routes.use('/auth', require('./auth.routes'))
routes.use('/images', require('./images.routes'))

module.exports = routes