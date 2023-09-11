require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const blogsRouter = require("./controllers/blogs")

const mongoUrl = process.env.MONGODB_URI

mongoose
  .connect(mongoUrl)
  .then(() => console.log("connected to MongoDB"))
  .catch((err) => console.error("error connecting to MongoDB:", error.message))

app.use(cors())
app.use(express.json())

app.use("/api/blogs", blogsRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
