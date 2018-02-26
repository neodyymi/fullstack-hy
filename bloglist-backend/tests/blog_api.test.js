const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { initialBlogs, blogsInDb } = require('./test_helper')

beforeAll(async () => {
  await Blog.remove({})

  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api
    .get('/api/blogs')

  expect(response.body.length).toBe(initialBlogs.length)
})

test('invalid blog is not added', async () => {
  const blogsAtStart = await blogsInDb()

  await api
    .post('/api/blogs')
    .send({
      author: 'asdf',
      likes: 10
    })
    .expect(400)

  const blogsAfterOperation = await blogsInDb()

  expect(blogsAfterOperation.length).toBe(blogsAtStart.length)
})

test('valid blog is added', async () => {
  const blogsAtStart = await blogsInDb()

  const newBlog = {
    title: 'You really hate NodeJS! Here’s why…',
    author: 'Deepal Jayasekara',
    url: 'https://jsblog.insiderattack.net/you-really-hate-node-58b1ff72202d',
    likes: 42
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAfterOperation = await blogsInDb()
  expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)

  const titles = blogsAfterOperation.map(r => r.title)
  expect(titles).toContain(newBlog.title)
})

test('blog with no likes value gets a default value', async () => {
  const newBlog = {
    title: 'You really hate NodeJS! Here’s why…',
    author: 'Deepal Jayasekara',
    url: 'https://jsblog.insiderattack.net/you-really-hate-node-58b1ff72202d'
  }

  const savedBlog = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(savedBlog.body.likes).toBe(0)
})



afterAll(() => {
  server.close()
})
