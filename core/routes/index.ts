import { Router } from 'express'

import usersRouter from './user'

const routes = Router()

routes.use('/users', usersRouter)

export default routes
