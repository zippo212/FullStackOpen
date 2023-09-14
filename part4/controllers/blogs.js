const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
  const { title, author, url, likes = 0 } = request.body
  if (!title || !url) return response.status(400).end()

  const blog = new Blog({ title, author, url, likes })

  const returnedBlog = await blog.save()
  response.status(201).json(returnedBlog)
})

module.exports = blogsRouter
