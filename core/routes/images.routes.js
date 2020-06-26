const { Router, static } = require('express')
const { resolve } = require('path')
const multer = require('multer')

const authMiddleware = require('../middlewares/auth')
const multerConfig = require('../config/multer')

const UserSchema = require('../database/schemas/UserSchema')
const PostSchema = require('../database/schemas/PostSchema')

const imagesRoutes = Router()

imagesRoutes.use(authMiddleware)
imagesRoutes.use('/', static(resolve(__dirname, '..', '..', 'tmp')))

imagesRoutes.get('/', async (req, res) => {
  const user = await UserSchema.findById(req.userId)

  res.send(user.files)
})

imagesRoutes.post('/', multer(multerConfig).single('file'), async (req, res) => {
  const { filename: _id, originalname: name, size, location: url = '' } = req.file

  const post = await PostSchema.create({ _id, name, size, url, author: req.userId })
  const user = await UserSchema.findById(req.userId)

  // Registering the new image uploaded to the user collection
  user.files.push(post.id)
  await user.save()

  res.json(post)
})

imagesRoutes.delete('/:id', async (req, res) => {
  await PostSchema.findByIdAndDelete(req.params.id)

  res.sendStatus(200)
})

module.exports = imagesRoutes