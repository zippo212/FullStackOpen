const Blog = require("../models/blog")

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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
}
