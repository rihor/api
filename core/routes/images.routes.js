const { Router, static } = require('express')
const { resolve } = require('path')
const { randomBytes } = require('crypto')
const multer = require('multer')

const path = resolve(__dirname, '..', '..', 'tmp')
const PostSchema = require('../database/schemas/PostSchema')

const imagesRoutes = Router()

imagesRoutes.use('/', static(path))

imagesRoutes.get('/', async (req, res) => {
  const posts = await PostSchema.find()

  res.json(posts)
})

imagesRoutes.post('/', multer({
  dest: path,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path)
    },
    filename: (req, file, cb) => {
      randomBytes(16, (error, hash) => {
        if (error) cb(error)

        const fileName = `${hash.toString('hex')}-${file.originalname}`

        cb(null, fileName)
      })
    }
  }),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if ('image/jpeg' == file.mimetype) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type'))
    }
  }
}).single('file'), async (req, res) => {
  const { filename, originalname: name, size, location: url = '' } = req.file
  const _id = filename.split('-')[0]

  const post = await PostSchema.create({ _id, name, size, url })

  res.json(post)
})

imagesRoutes.delete('/:id', async (req, res) => {
  await PostSchema.findByIdAndDelete(req.params.id)

  res.sendStatus(200)
})

module.exports = imagesRoutes