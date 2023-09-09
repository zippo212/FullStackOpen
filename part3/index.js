require("dotenv").config()
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const Person = require("./models/person")

const app = express()

app.use(express.json())
morgan.token("body", (req, res) => JSON.stringify(req.body))
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))
app.use(cors())
app.use(express.static("dist"))

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

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id)

  phoneBook = phoneBook.filter((entry) => entry.id !== id)

  res.status(204).end()
})

const generateId = () => {
  return Math.floor(Math.random() * 100000)
}

app.post("/api/persons", (req, res) => {
  const body = req.body
  console.log(body)
  // if (body.name && body.number) {
  //   if (phoneBook.find((entry) => entry.name === body.name)) {
  //     return res.status(400).json({ error: "name must be unique" })
  //   }

  //   const newEntry = {
  //     id: generateId(),
  //     name: body.name,
  //     number: body.number,
  //   }

  //   phoneBook = phoneBook.concat(newEntry)
  //   res.status(201).json(newEntry)
  // } else {
  //   return res.status(400).json({ error: "name and number are required" })
  // }
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log("server listening on port", PORT)
})
