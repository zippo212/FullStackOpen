const config = require("./utils/config")
const express = require("express")
const app = express()
const { info, error } = require("./utils/logger")
const cors = require("cors")
const middleware = require("./utils/middleware")
const blogsRouter = require("./controllers/blogs")
const mongoose = require("mongoose")

mongoose
  .connect(config.MONGODB_URI)
  .then(() => info("connected to MongoDB"))
  .catch((err) => error("error connecting to MongoDB:", err.message))

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use("/api/blogs", blogsRouter)

module.exports = app
