import { getRepository } from 'typeorm'

import User from '../model/User'

interface Request {
  username: string
}

class CreateUserService {
  public async execute ({ username }: Request): Promise<User> {
    const usersRepository = getRepository(User)

    const userExistence = await usersRepository.findOne({ where: username })

    if (userExistence) throw new Error('User already exists')

    const user = usersRepository.create({ username })

    await usersRepository.save(user)

    return user
  }
}

export default CreateUserService
