const { diskStorage } = require('multer')
const { extname, resolve } = require('path')
const { promisify } = require('util')
const { randomBytes } = require('crypto')

module.exports = {
  storage: diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp'),
    filename: async (req, file, cb) => {
      const hash = await promisify(randomBytes)(16)

      cb(null, hash.toString('hex') + extname(file.originalname))
    }
  }),
  limits: { fileSize: 1024 * 1024 * 2 }
}