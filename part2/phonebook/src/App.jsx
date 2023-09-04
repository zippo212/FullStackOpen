import { useState, useEffect } from 'react'
import phoneBookService from './services/phoneBook'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterBy, setFilterBy] = useState('')

  useEffect(() => {
    phoneBookService  
      .getAll()
      .then((initialPersons) => setPersons(initialPersons))
  },[])

  function handleNameInputChange(e) {
    setNewName(e.target.value)
  }

  function handleNumberInputChange(e) {
    setNewNumber(e.target.value)
  }

  function handleFilterChange (e) {
    setFilterBy(e.target.value)
  }

  function handlePersonDeletion (id) {
    const person = persons.find(p => p.id === id)
    if (!window.confirm(`Are you sure you want to delete ${person.name}`)) return

    phoneBookService
      .deletePerson(id)
      .then(() => setPersons(persons.filter(p => p.id !== id)))
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

    phoneBookService
      .create(newObj)
      .then(returnedNote => setPersons(persons.concat(returnedNote)))

    setNewName('')
    setNewNumber('')
  }

  const personsToRender = persons.filter(person => person.name.toLowerCase().includes(filterBy.toLowerCase().trim()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterBy} callback={handleFilterChange}/>
      <PersonForm 
        formCallback={handleFormSubmission}
        nameInput={{name:'name:',value:newName,callback:handleNameInputChange }}
        numberInput={{name:'number:',value:newNumber,callback:handleNumberInputChange }}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToRender} handleClick={handlePersonDeletion}/>
    </div>
  )
}

export default App