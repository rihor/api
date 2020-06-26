const { Schema, model } = require('../index')

const UserSchema = model('User', new Schema({
  username: {
    type: String,
    required: true
  }, password: {
    type: String,
    required: true
  }, email: {
    type: String,
    required: true
  },
  files: Array
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true
  }
}))

module.exports = UserSchema