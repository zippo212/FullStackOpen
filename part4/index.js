const config = require("./utils/config")
const { info, error } = require("./utils/logger")
const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const blogsRouter = require("./controllers/blogs")

const mongoUrl = config.MONGODB_URI

mongoose
  .connect(mongoUrl)
  .then(() => info("connected to MongoDB"))
  .catch((err) => error("error connecting to MongoDB:", error.message))

app.use(cors())
app.use(express.json())

app.use("/api/blogs", blogsRouter)

app.listen(config.PORT, () => {
  info(`Server running on port ${config.PORT}`)
})
