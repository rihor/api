const { Schema, model } = require('../index')

const InviteSchema = model('Invite', new Schema({
  _id: String,
  whose: String
}, {
  timestamps: {
    createdAt: true,
    updatedAt: false
  }
}))

module.exports = InviteSchema