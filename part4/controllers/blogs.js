const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (err) {
    next(err)
  }
})

blogsRouter.post("/", async (request, response, next) => {
  try {
    const { title, author, url, likes = 0 } = request.body
    if (!title || !url) return response.status(400).end()

    const blog = new Blog({ title, author, url, likes })

    const returnedBlog = await blog.save()
    response.status(201).json(returnedBlog)
  } catch (err) {
    next(err)
  }
})

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    const idToDelete = request.params.id
    await Blog.findByIdAndRemove(idToDelete)
    response.status(204).end()
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
