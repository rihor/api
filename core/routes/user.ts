import { Router } from 'express'

import CreateUserService from '../services/CreateUserService'

const usersRouter = Router()

usersRouter.post('/', async (request, response) => {
  const { username } = request.body

  const CreateUser = new CreateUserService()

  const user = await CreateUser.execute({ username })

  response.status(201).json(user)
})

export default usersRouter
