const { Schema, model } = require('../index')

const PostSchema = model('Post', new Schema({
  _id: String,
  name: String,
  size: Number,
  url: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: {
    createdAt: true,
    updatedAt: false
  }
}))

module.exports = PostSchema