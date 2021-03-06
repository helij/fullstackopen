const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({}).populate('user', { id: 1, username: 1, name: 1 })
  response.json(blogs.map(Blog.format))

})

blogsRouter.post('/', async (request, response) => {

  const body = request.body

  try {

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }


    if (body.title === undefined && body.url === undefined) {
      return response.status(400).json({ error: 'parameters missing' })
    }

    const user = await User.findById(body.userId)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(Blog.format(savedBlog))
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    const blog = await Blog.findById(request.params.id)

    if (blog) {
      if (blog.user.toString() === decodedToken.id.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
      }
      else {
        return response.status(401).json({ error: 'user is not the owner of the blog' })
      }
    } else {
      return response.status(404).json({ error: 'blog has already been removed' })
    }
  }
  catch (exception) {
    console.log(exception)
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message })
    }
    else {
      response.status(500).send({ error: 'something went wrong...' })
    }
  }
})

blogsRouter.put('/:id', async (request, response) => {

  try {
    const body = request.body

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
    }

    const savedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(savedBlog)
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }

})


module.exports = blogsRouter