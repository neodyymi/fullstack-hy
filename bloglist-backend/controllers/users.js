const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User
    .find({})
    .populate('blogs', { likes: 1, author: 1, title: 1, url: 1 })
  res.json(users.map(User.format))
})

usersRouter.post('/', async (req, res) => {
  try {


    if(req.body.username === undefined || req.body.name === undefined || req.body.password === undefined) {
      return res.status(400).json({ error: 'content missing' })
    }

    const existingUser = await User.find({ username: req.body.username })
    if (existingUser.length>0) {
      return res.status(400).json({ error: 'username must be unique' })
    }

    if(req.body.password.length < 3) {
      return res.status(400).json({ error: 'password must be at least 3 characters long' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(req.body.password, saltRounds)

    const user = new User({
      username: req.body.username,
      name: req.body.name,
      adult: req.body.adult,
      passwordHash
    })
    const savedUser = await user.save()
    res.status(201).json(User.format(savedUser))
  } catch (exception) {
    console.log(exception)
    res.status(500).json({ error: 'something went wrong...' })
  }
})

usersRouter.delete('/:id', async (req, res) => {
  try{
    await User.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } catch (exception) {
    console.log(exception)
    res.status(400).send({ error: 'malformatted id' })
  }
})

module.exports = usersRouter