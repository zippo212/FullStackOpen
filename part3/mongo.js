const mongoose = require("mongoose")

if (process.argv.length < 3) {
  console.log("give password as argument")
  process.exit(1)
}

const [, , password, personName, personNumber] = process.argv

const url = `mongodb+srv://phonebook:${password}@cluster0.w38inph.mongodb.net/phoneBookApp?retryWrites=true&w=majority`

mongoose.set("strictQuery", false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model("Person", personSchema)

if (!personName) {
  Person.find({}).then((persons) => {
    console.log("phonebook:")
    persons.forEach((person) => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}

if (personName && personNumber) {
  const person = new Person({
    name: personName,
    number: personNumber,
  })

  person.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to the phonebook`)
    mongoose.connection.close()
  })
}
