import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ messageType, setMessageType ] = useState(0) //Jos 0, onnistuneen operaation viesti. Jos 1, errorviesti


  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log(initialPersons)
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    
    //Toteutettu "case insensitive" merkkijonojen vertailu
    if (persons.some(person => person.name.localeCompare(newName, undefined, { sensitivity: 'accent' }) === 0)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
        const changedPerson = { ...person, number: newNumber }

        personService
          .update(changedPerson.id, changedPerson)
          .then(returnedPerson => {
            console.log(returnedPerson)
            makeMessage(`Updated ${changedPerson.name}`, 0)
            setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            makeMessage(`Information of ${changedPerson.name} has already been removed from server`, 1)
            setPersons(persons.filter(p => p.id !== changedPerson.id))
          })
      }
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          makeMessage(`Added ${returnedPerson.name}`, 0)
          setNewName('')
          setNewNumber('')
          setPersons(persons.concat(returnedPerson))
        })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const handleDeleteClick = (name) => {
    console.log(name)
    if (window.confirm(`Delete ${name}?`)) {
      const person = persons.find(person =>
        person.name === name  
      )
      personService
        .deletePerson(person.id)
        .then(returnedData => {
          console.log(returnedData)
          makeMessage(`Deleted ${name}`, 0)
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  const makeMessage = (text, type) => {
    setMessage(text)
    setMessageType(type)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const personsToShow = persons.filter(person => 
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType}/>
      <Filter filter={filter} handleChange={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm name={newName} number={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} handleSubmit={addPerson}/>
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} handleClick={handleDeleteClick}/>
    </div>
  )

}

export default App