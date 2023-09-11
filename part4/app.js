const config = require("./utils/config")
const { info, error } = require("./utils/logger")
const express = require("express")
const app = express()
const cors = require("cors")
const blogsRouter = require("./controllers/blogs")
const mongoose = require("mongoose")

mongoose
  .connect(config.MONGODB_URI)
  .then(() => info("connected to MongoDB"))
  .catch((err) => error("error connecting to MongoDB:", err.message))

app.use(cors())
app.use(express.json())

app.use("/api/blogs", blogsRouter)

module.exports = app
