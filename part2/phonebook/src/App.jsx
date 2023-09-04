import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterBy, setFilterBy] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((res) => setPersons(res.data))
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
      <Filter value={filterBy} callback={handleFilterChange}/>
      <PersonForm 
        formCallback={handleFormSubmission}
        nameInput={{name:'name:',value:newName,callback:handleNameInputChange }}
        numberInput={{name:'number:',value:newNumber,callback:handleNumberInputChange }}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToRender}/>
    </div>
  )
}

export default App