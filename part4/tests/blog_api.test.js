const supertest = require("supertest")
const mongoose = require("mongoose")
const helper = require("./blog_api_test_helper")
const app = require("../app")
const Blog = require("../models/blog")

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Promise.all(helper.initialBlogs.map((blog) => new Blog(blog).save()))
})

test("blogs are returned in the correct number and as json", async () => {
  const blogs = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)

  expect(blogs.body).toHaveLength(helper.initialBlogs.length)
})

test("blogs post unique identifier property is id", async () => {
  const blogs = await helper.blogsInDb()
  const blog = blogs[0]
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

  const updatedBlogs = await helper.blogsInDb()
  expect(updatedBlogs).toHaveLength(helper.initialBlogs.length + 1)
  expect(updatedBlogs[updatedBlogs.length - 1]).toMatchObject(newBlog)
})

test("creating a new blog post without likes property defaults to 0", async () => {
  const newBlog = {
    title: "Test Likes Missing",
    author: "No likes",
    url: "http://exemple.com",
  }

  const response = await api.post("/api/blogs").send(newBlog)
  expect(response.body.likes).toBe(0)
  const updatedBlogs = await helper.blogsInDb()
  expect(updatedBlogs).toHaveLength(helper.initialBlogs.length + 1)
})

test("creating a new blog post without title property", async () => {
  const newBlog = {
    author: "No likes",
    url: "http://exemple.com",
    likes: 21,
  }

  await api.post("/api/blogs").send(newBlog).expect(400)
  const updatedBlogs = await helper.blogsInDb()
  expect(updatedBlogs).toHaveLength(helper.initialBlogs.length)
})

test("creating a new blog post without url property", async () => {
  const newBlog = {
    title: "Test Likes Missing",
    author: "No likes",
    likes: 21,
  }

  await api.post("/api/blogs").send(newBlog).expect(400)
  const updatedBlogs = await helper.blogsInDb()
  expect(updatedBlogs).toHaveLength(helper.initialBlogs.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})
