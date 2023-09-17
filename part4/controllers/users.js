const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.post("/", async (request, response, next) => {
  const { username, password, name } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = new User({ username, passwordHash, name })

  try {
    const returnedUser = await newUser.save()
    response.status(201).json(returnedUser)
  } catch (err) {
    next(err)
  }
})

usersRouter.get("/", async (request, response, next) => {
  const allUsers = await User.find({})
  response.json(allUsers)
})

module.exports = usersRouter
