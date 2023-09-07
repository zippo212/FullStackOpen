import { useState, useEffect } from 'react'
import phoneBookService from './services/phoneBook'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterBy, setFilterBy] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  
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
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
        setSuccessMessage(`Successfully deleted ${person.name}`)
        setTimeout(() => setSuccessMessage(null),3000)
      })
  }

  function handleFormSubmission(e) {
    e.preventDefault()
    const person = persons.find(p => p.name === newName.trim())
    if(person) {
      const confirmation = window.confirm(`${person.name} is already added to the phonebook, replace the old number with a new one?`)
      if (confirmation) {
        const updatedPerson = {...person, number: newNumber}
        phoneBookService
          .update(person.id, updatedPerson)
          .then(returnedPerson => {
              setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
              setSuccessMessage(`Successfully changed number for ${person.name}`)
              setTimeout(() => setSuccessMessage(null),3000)
            })
            .catch(error => {
              setPersons(persons.filter(p => p.id !== person.id))
              setErrorMessage(`Information of ${person.name} has already been removed form server`)
              setTimeout(() => setErrorMessage(null),3000)
            })
      }
      setNewName('')
      setNewNumber('')
      return
    }

    const newObj = {
      name: newName,
      number: newNumber
    }

    phoneBookService
      .create(newObj)
      .then(returnedNote => {
        setPersons(persons.concat(returnedNote))
        setSuccessMessage(`Added ${newObj.name}`)
        setTimeout(() => setSuccessMessage(null),3000)
      })

    setNewName('')
    setNewNumber('')
  }

  const personsToRender = persons.filter(p => p.name.toLowerCase().includes(filterBy.toLowerCase().trim()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification success={successMessage} error={errorMessage}/>
      <Filter value={filterBy} callback={handleFilterChange}/>
      <h3>Add a new</h3>
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