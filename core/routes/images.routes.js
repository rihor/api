const { Router, static } = require('express')
const { resolve } = require('path')
const multer = require('multer')

const multerConfig = require('../config/multer')

const PostSchema = require('../database/schemas/PostSchema')

const imagesRoutes = Router()

imagesRoutes.use('/', static(resolve(__dirname, '..', '..', 'tmp')))

imagesRoutes.get('/', async (req, res) => {
  const posts = await PostSchema.find()

  res.json(posts)
})

imagesRoutes.post('/', multer(multerConfig).single('file'), async (req, res) => {
  const { filename: _id, originalname: name, size, location: url = '' } = req.file

  const post = await PostSchema.create({ _id, name, size, url })

  res.json(post)
})

imagesRoutes.delete('/:id', async (req, res) => {
  await PostSchema.findByIdAndDelete(req.params.id)

  res.sendStatus(200)
})

module.exports = imagesRoutes