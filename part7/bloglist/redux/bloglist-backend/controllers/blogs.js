const blogsRouter = require('express').Router()
const { userExtractor } = require('../utils/middleware')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { blogs: 0 })
    response.json(blogs)
  } catch (err) {
    next(err)
  }
})

blogsRouter.post('/', userExtractor, async (request, response, next) => {
  try {
    const user = request.user
    if (user == null) {
      return response.status(401).json({ error: 'Invalid token' })
    }
    const { title, author, url, likes = 0 } = request.body

    if (!title || !url) return response.status(400).send({ error: 'title or url missing' })

    const blog = new Blog({ title, author, url, likes, user: user._id })

    const returnedBlog = await blog.save()
    user.blogs = user.blogs.concat(returnedBlog._id)
    await user.save()
    const populatedBlog = await Blog.findById(returnedBlog._id).populate('user', { blogs: 0 })
    response.status(201).json(populatedBlog)
  } catch (err) {
    next(err)
  }
})

blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  try {
    const user = request.user
    if (user == null) {
      return response.status(401).json({ error: 'Invalid token' })
    }

    const idToDelete = request.params.id
    const blog = await Blog.findById(idToDelete)
    if (blog?.user.toString() === user._id.toString()) {
      await Blog.findByIdAndRemove(idToDelete)
      response.status(204).end()
    } else {
      response.status(401).json({ error: 'Invalid token' })
    }
  } catch (err) {
    next(err)
  }
})

blogsRouter.put('/:id', userExtractor, async (request, response, next) => {
  try {
    const idToUpdate = request.params.id
    const blog = await Blog.findById(idToUpdate)
    if (!blog) return response.status(404).end()

    const { title, author, url, likes, user } = request.body
    const updatedBlog = {
      title,
      author,
      url,
      likes,
    }

    const result = await Blog.findByIdAndUpdate(idToUpdate, updatedBlog, { new: true })
    const populatedBlog = await Blog.findById(result._id).populate('user', { blogs: 0 })
    response.json(populatedBlog)
  } catch (err) {
    next(err)
  }
})

module.exports = blogsRouter
