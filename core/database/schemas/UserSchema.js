const { Schema, model } = require('../index')

const UserSchema = model('User', new Schema({
  username: String,
  email: String,
  password: String
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true
  }
}))

module.exports = UserSchema