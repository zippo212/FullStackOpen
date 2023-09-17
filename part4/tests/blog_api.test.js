const supertest = require("supertest")
const mongoose = require("mongoose")
const helper = require("./blog_api_test_helper")
const bcrypt = require("bcrypt")
const app = require("../app")
const Blog = require("../models/blog")
const User = require("../models/user")

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Promise.all(helper.initialBlogs.map((blog) => new Blog(blog).save()))
})

describe("GET /api/blogs", () => {
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
})

describe("POST /api/blogs", () => {
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
})

describe("DELETE /api/blogs", () => {
  test("deleting a single blog post with valid id", async () => {
    const blogPosts = await helper.blogsInDb()
    const postToDelete = blogPosts[0]

    await api.delete(`/api/blogs/${postToDelete.id}`).expect(204)

    const updatedBlogs = await helper.blogsInDb()
    expect(updatedBlogs).toHaveLength(helper.initialBlogs.length - 1)

    const currentIDs = updatedBlogs.map((b) => b.id)
    expect(currentIDs).not.toContain(postToDelete.id)
  })

  test("deleting a single blog post with invalid id", async () => {
    const invalidId = await helper.getInvalidId()
    await api.delete(`/api/blogs/${invalidId}`).expect(204)

    const updatedBlogs = await helper.blogsInDb()
    expect(updatedBlogs).toHaveLength(helper.initialBlogs.length)
  })
})

describe("PUT /api/blogs", () => {
  test("updating a blog post with valid id", async () => {
    const blogPosts = await helper.blogsInDb()
    const postToUpdate = blogPosts[0]

    const updatedBlog = { likes: 21 }
    await api
      .put(`/api/blogs/${postToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    const updatedPost = await Blog.findById(postToUpdate.id)
    expect(updatedPost.likes).toBe(21)
  })

  test("updating a blog post with invalid id", async () => {
    const invalidId = await helper.getInvalidId()

    const updatedBlog = { likes: 21 }
    await api.put(`/api/blogs/${invalidId}`).send(updatedBlog).expect(404)
  })
})

describe("user creation /api/users", () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash("secret", 10)
    const testUser = new User({ username: "testUser", passwordHash, name: "Test User" })
    await testUser.save()
  })

  test("creation succeeds with a fresh username", async () => {
    const InitialUsers = await User.find({})
    const user = { username: "newTestUser", password: "secretPassword", name: "Some Name" }

    await api
      .post("/api/users")
      .send(user)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const usersAtTheEnd = await User.find({})
    expect(usersAtTheEnd).toHaveLength(InitialUsers.length + 1)

    const usernameArray = usersAtTheEnd.map((user) => user.username)
    expect(usernameArray).toContain(user.username)
  })

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const InitialUsers = await User.find({})
    const user = { username: "testUser", password: "secretPassword", name: "Some Name" }

    const result = await api
      .post("/api/users")
      .send(user)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain("expected `username` to be unique")

    const usersAtTheEnd = await User.find({})
    expect(usersAtTheEnd).toEqual(InitialUsers)
  })

  test("creation fails with proper statuscode and message if password length shorter than expected", async () => {
    const InitialUsers = await User.find({})
    const user = { username: "newTestUser", password: "sh", name: "Some Name" }

    const result = await api
      .post("/api/users")
      .send(user)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain("Invalid password length")

    const usersAtTheEnd = await User.find({})
    expect(usersAtTheEnd).toEqual(InitialUsers)
  })

  test("creation fails with proper statuscode and message if username length shorter than expected", async () => {
    const InitialUsers = await User.find({})
    const user = { username: "nu", password: "secretPassword", name: "Some Name" }

    const result = await api
      .post("/api/users")
      .send(user)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain("User validation failed")

    const usersAtTheEnd = await User.find({})
    expect(usersAtTheEnd).toEqual(InitialUsers)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
