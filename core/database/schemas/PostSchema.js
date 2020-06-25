const { Schema, model } = require('../index')

const PostSchema = model('Post', new Schema({
  _id: String,
  name: String,
  size: Number,
  url: String
}, {
  timestamps: {
    createdAt: true,
    updatedAt: false
  }
}))

module.exports = PostSchema