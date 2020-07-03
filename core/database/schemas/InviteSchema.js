const { Schema, model } = require('../index')

const InviteSchema = model('Invite', new Schema({
  whose: String
}, {
  timestamps: {
    createdAt: true,
    updatedAt: false
  }
}))

module.exports = InviteSchema