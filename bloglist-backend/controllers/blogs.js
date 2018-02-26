const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  res.json(blogs.map(Blog.format))
})

blogsRouter.post('/', async (req, res) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    if (!req.token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    if(req.body.title === undefined || req.body.author === undefined) {
      return res.status(400).json({ error: 'content missing' })
    }

    const poster = await User.findById(decodedToken.id)

    const blog = new Blog({
      user: poster,
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      likes: req.body.likes
    })

    const savedBlog = await blog.save()

    poster.blogs = poster.blogs.concat(savedBlog._id)
    await poster.save()

    res.status(201).json(Blog.format(savedBlog))
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError' ) {
      res.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      res.status(500).json({ error: 'something went wrong...' })
    }
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  try{
    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    if (!req.token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blogToBeDeleted = await Blog.findById(req.params.id)
    if(blogToBeDeleted.user.toString() !== user._id.toString()) {
      res.status(401).json({ error: 'wrong user' })
      return
    }

    await Blog.findByIdAndRemove(req.params.id)

    user.blogs = user.blogs.filter(blog => blog.id.toString() !== req.params.id.toString())
    await user.save()
    res.status(204).end()
  } catch (exception) {
    console.log(exception)
    res.status(400).send({ error: 'malformatted id' })
  }
})

module.exports = blogsRouter