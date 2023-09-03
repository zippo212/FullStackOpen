import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  function handleInputChange(e) {
    setNewName(e.target.value)
  }

  function handleFormSubmission(e) {
    e.preventDefault()
    const newObj = {
      name: newName,
    }
    setPersons(persons.concat(newObj))
    setNewName('')
  }

  return (
    <div>
    <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      <form onSubmit={handleFormSubmission}>
        <div>
          name: <input value={newName} onChange={handleInputChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  )
}

export default App