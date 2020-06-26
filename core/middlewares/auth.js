const { verify } = require('jsonwebtoken')
const { promisify } = require('util')

const { secret } = require('../config/auth')

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) return res.status(401).json({ error: 'Token not informed' })

  const [scheme, token] = authHeader.split(' ')

  if (scheme !== 'Bearer') return res.status(401).json({ error: 'Token malformatted' })

  try {
    const decoded = await promisify(verify)(token, secret)

    req.userId = decoded.id

    return next()
  } catch (error) {
    res.status(401).json({ error: 'Token invalid' })
  }
}