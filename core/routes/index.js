const { Router } = require('express')

const routes = Router()

routes.use('/auth', require('./auth'))
routes.use('/upload', require('./upload'))
routes.use('/user', require('./user'))

module.exports = routes