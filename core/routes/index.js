const { Router } = require('express')

const routes = Router()

routes.use('/auth', require('./auth.routes'))
routes.use('/upload', require('./upload.routes'))
routes.use('/user', require('./user.routes'))

module.exports = routes