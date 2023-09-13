const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blog")

const api = supertest(app)

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

beforeEach(async () => {
  await Blog.deleteMany({})
  await Promise.all(initialBlogs.map((blog) => new Blog(blog).save()))
})

test("blogs are returned in the correct number and as json", async () => {
  const blogs = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)

  expect(blogs.body).toHaveLength(initialBlogs.length)
})

test("blogs post unique identifier property is id", async () => {
  const blogs = await Blog.find({})
  const blog = blogs.map((b) => b.toJSON())[0]
  expect(blog.id).toBeDefined()
})

test("creating a new blog post", async () => {
  const newBlog = {
    title: "Test Title New",
    author: "Author New",
    url: "http://exemple.com",
    likes: 21,
  }

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const updatedBlogs = await Blog.find({})
  expect(updatedBlogs).toHaveLength(initialBlogs.length + 1)

  const titles = updatedBlogs.map((b) => b.title)
  expect(titles).toContain(newBlog.title)
})

afterAll(async () => {
  await mongoose.connection.close()
})
