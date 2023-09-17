const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.post("/", async (request, response) => {
  try {
    const { username, password, name } = request.body
    if (password.length < 3)
      return response
        .status(400)
        .send({ error: `Invalid password length, must be at least 3 characters long received ${password.length}` })

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const newUser = new User({ username, passwordHash, name })

    const returnedUser = await newUser.save()
    response.status(201).json(returnedUser)
  } catch (err) {
    response.status(400).send({ error: err.message })
  }
})

usersRouter.get("/", async (request, response, next) => {
  const allUsers = await User.find({}).populate("blogs", { user: 0 })
  response.json(allUsers)
})

module.exports = usersRouter
