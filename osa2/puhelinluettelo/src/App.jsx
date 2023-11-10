import React, { useState, useEffect } from 'react'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState('')


  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterResults = (event) => {
    setShowAll(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name:newName,
      number:newNumber
    }
    
    if (checkIfNameExists() == true) alert(`${newName} is already added to phonebook`)
    else{
    personsService
    .create(nameObject)
    .then(newNameObject => {
      setPersons(persons.concat(newNameObject))
      setNewName('')
      setNewNumber('')
    })
    }
  }

  const contactsToShow = showAll 
  ? persons.filter(person => person.name.toUpperCase().indexOf(showAll.toUpperCase()) !== -1)
  : persons

  const checkIfNameExists = () => {
    let exists = false

    persons.forEach(individual=> { if (individual.name === newName ) exists = true}) 
    return exists
  }

  return (
    <div>

      <h2>Phonebook</h2>

      <Filter showAll={showAll} handle={handleFilterResults}/>

      <h2>Add a new Contact</h2>

      <PersonForm 
      addName = {addName} 
      newName={newName} 
      handleName={handleNameChange} 
      newNumber={newNumber} 
      handleNumber={handleNumberChange}/>

      <h2>Numbers</h2>

      <Persons contacts = {contactsToShow} />

    </div>
  )

}

const Person = (props) => {
   return(
      <p>{props.name} {props.number}</p>
   ) 
}

const Filter = (props) => {
  return (
    <form>
        filter shown with <input value={props.showAll} onChange = {props.handle}/>
      </form>

    )
}

const PersonForm = (props) => {
  return (

    <form onSubmit={props.addName}>
    <div>
        name: <input value={props.newName} onChange={props.handleName}/>
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.handleNumber}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>

    )
}

const Persons = (props) => {
  return (
    <div>
      {props.contacts.map((person) => (
        <Person key={person.name} name={person.name} number={person.number} />
      ))}
    </div>
  )
}


export default App