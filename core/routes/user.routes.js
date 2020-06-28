const { Router } = require('express')
const { hash } = require('bcrypt')

const authMiddleware = require('../middlewares/auth')

const UserSchema = require('../database/schemas/UserSchema')

const userRoutes = Router()

userRoutes.use(authMiddleware)

userRoutes.get('/manage', async (req, res) => {
  const user = await UserSchema.findById(req.userId)

  user.password = undefined

  res.send(user)
})

userRoutes.post('/manage', async (req, res) => {
  const { email, password } = req.body

  if (email.length) {
    await UserSchema.findByIdAndUpdate(req.userId, { $set: { email } })
    return res.json({ return: 'Email changed successfully!' })
  } else if (password.length) {
    await UserSchema.findByIdAndUpdate(req.userId, { $set: { password: await hash(password, 16) } })
    return res.json({ return: 'Password changed successfully!' })
  }
})

userRoutes.get('/images', async (req, res) => {
  const user = await UserSchema.findById(req.userId)

  res.send(user.files)
})

module.exports = userRoutes