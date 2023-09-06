const express = require("express")
const app = express()

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

app.get("/api/persons", (req, res) => {
  res.json(phoneBook)
})

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id)
  const entry = phoneBook.find((e) => e.id === id)

  if (!entry) return res.status(404).end()

  res.json(entry)
})

app.get("/info", (req, res) => {
  res.send(`
      <p>Phonebook has info for ${phoneBook.length} people</p>
      <p>${Date()}</p>
    `)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log("server listening on port", PORT)
})
