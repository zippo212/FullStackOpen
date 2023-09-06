const express = require("express")
const morgan = require("morgan")

const app = express()

app.use(express.json())
app.use(morgan("tiny"))

let phoneBook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
]

app.get("/info", (req, res) => {
  res.send(`
      <p>Phonebook has info for ${phoneBook.length} people</p>
      <p>${Date()}</p>
    `)
})

app.get("/api/persons", (req, res) => {
  res.json(phoneBook)
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
  console.log(req.body)
  const body = req.body

  if (body.name && body.number) {
    if (phoneBook.find((entry) => entry.name === body.name)) {
      return res.status(400).json({ error: "name must be unique" })
    }

    const newEntry = {
      id: generateId(),
      name: body.name,
      number: body.number,
    }

    phoneBook = phoneBook.concat(newEntry)
    res.status(201).json(newEntry)
  } else {
    return res.status(400).json({ error: "name and number are required" })
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log("server listening on port", PORT)
})
