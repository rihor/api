const { Router } = require('express')
const { hash, compare } = require('bcrypt')
const { v4: uuidv4 } = require('uuid')
const { sign } = require('jsonwebtoken')

const { secret, expiresIn } = require('../config/auth')

const UserSchema = require('../database/schemas/UserSchema')
const InviteSchema = require('../database/schemas/InviteSchema')

const authRoutes = Router()

generateToken = (params = {}) => sign(params, secret, { expiresIn })

authRoutes.post('/register', async (req, res) => {
  const { username, password, email, invite } = req.body

  try {
    if (await UserSchema.findOne({ username })) {
      res.status(400).json({ error: 'User already exists' })
    } else if (username < 2) {
      res.status(400).json({ error: 'Username too short, must contain at least 2 characters' })
    } else if (password < 8) {
      res.status(400).json({ error: 'Password too short, must contain at least 8 characters' })
    }

    // Checking if the invitation code exists
    const inviteExists = Boolean(await InviteSchema.findById(invite))

    if (!inviteExists) return res.status(400).send('Invalid invite')

    // Creating the user register in the database
    const user = await UserSchema.create({ username, email, password: await hash(password, 16) })

    // Deleting the used invitation and creating a new one for the user
    await InviteSchema.findByIdAndDelete(invite)
    await InviteSchema.create({ _id: uuidv4(), whoose: username })

    // Making the password not appear in the response object
    user.password = undefined

    res.status(201).send({ user, token: generateToken({ id: user.id }) })
  } catch (error) {
    res.status(400).json({ error: 'Lack of parameters in the request body' })
  }
})

authRoutes.post('/login', async (req, res) => {
  const { username, password } = req.body

  const user = await UserSchema.findOne({ username })

  if (!user) return res.status(400).json({ error: 'User not found' })

  if (!await compare(password, user.password)) return res.status(400).json({ error: 'Invalid password' })

  user.password = undefined

  res.send({ user, token: generateToken({ id: user.id }) })
})

module.exports = authRoutes