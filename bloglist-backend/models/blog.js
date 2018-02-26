const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  id: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  author: String,
  url: String,
  likes: { type: Number, default: 0 }
})

blogSchema.statics.format = (blog) => {
  return {
    id: blog._id,
    user: blog.user,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }
}

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog