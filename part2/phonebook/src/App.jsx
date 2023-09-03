import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  function handleNameInputChange(e) {
    setNewName(e.target.value)
  }

  function handleNumberInputChange(e) {
    setNewNumber(e.target.value)
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

  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map(person => <p key={person.name}>{`${person.name} ${person.number}`}</p>)}
    </div>
  )
}

export default App