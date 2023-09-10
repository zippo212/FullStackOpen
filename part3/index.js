require("dotenv").config()
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const Person = require("./models/person")

const app = express()
app.use(cors())

app.use(express.static("dist"))
app.use(express.json())
morgan.token("body", (req, res) => JSON.stringify(req.body))
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))

app.get("/info", (req, res) => {
  res.send(`
      <p>Phonebook has info for ${phoneBook.length} people</p>
      <p>${Date()}</p>
    `)
})

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons)
  })
})

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id)
  const entry = phoneBook.find((e) => e.id === id)

  if (!entry) return res.status(404).end()

  res.json(entry)
})

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => res.status(204).end())
    .catch((error) => next(error))
})

app.post("/api/persons", (req, res) => {
  const body = req.body

  if (body.name && body.number) {
    const newEntry = new Person({
      name: body.name,
      number: body.number,
    })

    newEntry.save().then((result) => res.status(201).json(result))
  } else {
    res.status(400).json({ error: "name and number are required" })
  }
})

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body

  const newEntry = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id, newEntry, { new: true })
    .then((updatedPerson) => res.json(updatedPerson))
    .catch((error) => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  }

  next(error)
}
// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log("server listening on port", PORT)
})
