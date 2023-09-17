const jwt = require("jsonwebtoken")
const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", { blogs: 0 })
    response.json(blogs)
  } catch (err) {
    next(err)
  }
})

blogsRouter.post("/", async (request, response, next) => {
  try {
    const user = request.user
    if (user == null) {
      return response.status(401).json({ error: "Invalid token" })
    }
    const { title, author, url, likes = 0 } = request.body

    if (!title || !url) return response.status(400).end()

    const blog = new Blog({ title, author, url, likes, user: user._id })

    const returnedBlog = await blog.save()
    user.blogs = user.blogs.concat(returnedBlog._id)
    await user.save()
    response.status(201).json(returnedBlog)
  } catch (err) {
    next(err)
  }
})

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    const user = request.user
    if (user == null) {
      return response.status(401).json({ error: "Invalid token" })
    }

    const idToDelete = request.params.id
    const blog = await Blog.findById(idToDelete)
    if (blog?.user.toString() === user._id.toString()) {
      await Blog.findByIdAndRemove(idToDelete)
      response.status(204).end()
    } else {
      response.status(401).end()
    }
  } catch (err) {
    next(err)
  }
})

blogsRouter.put("/:id", async (request, response, next) => {
  try {
    const idToUpdate = request.params.id
    const blog = await Blog.findById(idToUpdate)
    if (!blog) return response.status(404).end()

    const { title, author, url, likes } = request.body
    const updatedBlog = {
      title,
      author,
      url,
      likes,
    }

    const result = await Blog.findByIdAndUpdate(idToUpdate, updatedBlog, { new: true })
    response.json(result)
  } catch (err) {
    next(err)
  }
})

module.exports = blogsRouter
