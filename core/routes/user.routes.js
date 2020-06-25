const { Router } = require('express')
const { hash } = require('bcrypt')
const { v4: uuidv4 } = require('uuid')


const UserSchema = require('../database/schemas/UserSchema')
const InviteSchema = require('../database/schemas/InviteSchema')

const userRoutes = Router()

userRoutes.post('/register', async (req, res) => {
  const { username, email, password, invite } = req.body

  if (await UserSchema.findOne({ username })) {
    res.status(400).send('User already exists')
  } else if (!username) {
    res.status(400).send('Username is not defined')
  } else if (!password) {
    res.status(400).send('Password is not defined')
  } else if (!invite) {
    res.status(400).send('Invite is not defined')
  } else if (username < 2) {
    res.status(400).send('Username too short (minimum 2 characters)')
  } else if (username > 15) {
    res.status(400).send('Username too long (maximum 15 characters)')
  } else if (password < 8) {
    res.status(400).send('Password too short (minimum 8 characters)')
  }

  // Checking if the invitation code exists
  const inviteExists = Boolean(await InviteSchema.findById(invite))

  if (!inviteExists) return res.status(400).send('Invalid invite')

  // Creating the user register in the database
  const User = await UserSchema.create({ username, email, password: await hash(password, 16) })

  // Deleting the used invitation and creating a new one for the user
  await InviteSchema.findByIdAndDelete(invite)
  await InviteSchema.create({ _id: uuidv4(), whoose: username })
  
  // Making the password not appear in the response object
  User.password = undefined

  res.status(201).json(User)
})

module.exports = userRoutes