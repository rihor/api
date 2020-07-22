import { Router } from 'express'

import CreateUserService from '../services/CreateUserService'

const usersRouter = Router()

usersRouter.post('/', async (request, response) => {
  const { username } = request.body

  try {
    const CreateUser = new CreateUserService()

    const user = await CreateUser.execute({ username })

    response.status(201).json(user)
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
})

export default usersRouter
