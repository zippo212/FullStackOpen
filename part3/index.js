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

app.get("/info", (req, res, next) => {
  Person.countDocuments({})
    .then((count) => {
      res.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${Date()}</p>
      `)
    })
    .catch((error) => next(error))
})

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons)
  })
})

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => res.status(204).end())
    .catch((error) => next(error))
})

app.post("/api/persons", (req, res, next) => {
  const { name, number } = req.body

  const newEntry = new Person({ name, number })

  newEntry
    .save()
    .then((result) => {
      res.status(201).json(result)
    })
    .catch((error) => {
      next(error)
    })
})

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body

  const newEntry = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id, newEntry, { new: true, runValidators: true, context: "query" })
    .then((updatedPerson) => res.json(updatedPerson))
    .catch((error) => {
      next(error)
    })
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log("server listening on port", PORT)
})
