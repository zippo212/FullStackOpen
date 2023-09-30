const Blog = require("../models/blog")
const User = require("../models/user")

const initialBlogs = [
  {
    title: "Test Title 1",
    author: "Author 1",
    url: "http://exemple.com",
    likes: 4,
  },
  {
    title: "Test Title 2",
    author: "Author 2",
    url: "http://exemple.com",
    likes: 15,
  },
]

const getInvalidId = async () => {
  const invalidBlog = new Blog(initialBlogs[0])
  await invalidBlog.save()
  await invalidBlog.deleteOne()

  return invalidBlog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  getInvalidId,
}
