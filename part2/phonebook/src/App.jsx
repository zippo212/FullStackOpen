import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterBy, setFilterBy] = useState('')

  function handleNameInputChange(e) {
    setNewName(e.target.value)
  }

  function handleNumberInputChange(e) {
    setNewNumber(e.target.value)
  }

  function handleFilterChange (e) {
    setFilterBy(e.target.value)
  }

  function handleFormSubmission(e) {
    e.preventDefault()
    if(persons.find(person => person.name === newName.trim())) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      return
    }

    const newObj = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(newObj))
    setNewName('')
    setNewNumber('')
  }

  const personsToRender = persons.filter(person => person.name.toLowerCase().includes(filterBy.toLowerCase().trim()))
  
  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with<input value={filterBy} onChange={handleFilterChange}/>
      <form onSubmit={handleFormSubmission}>
        <div>
          <div>name: <input value={newName} onChange={handleNameInputChange}/></div>
          <div>number: <input value={newNumber} onChange={handleNumberInputChange}/></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToRender.map(person => <p key={person.name}>{`${person.name} ${person.number}`}</p>)}
    </div>
  )
}

export default App