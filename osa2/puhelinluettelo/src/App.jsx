import React, { useState, useEffect } from 'react'
import personsService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')


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

  const updateNumber = (existingPerson, newNumber) => {
    console.log("Existing Person:", existingPerson);
  
    const confirmUpdate = window.confirm(
      `${existingPerson.name} is already added to the phonebook with number ${existingPerson.number}. Do you want to update the number?`
    );
  
    if (confirmUpdate) {
      const updatedPerson = { ...existingPerson, number: newNumber }
      console.log("Updated Person:", updatedPerson);
  
      personsService
        .update(existingPerson.id, updatedPerson)
        .then(response => {
          console.log("Update Response:", response);
        
          setPersons(persons =>
            persons.map(person => person.id !== existingPerson.id ? person : response))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(
            `${existingPerson.name}'s phone number updated successfully`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(
            `Information of ${existingPerson.name} has already been removed from the phonebook `
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name:newName,
      number:newNumber
    }
    
    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      updateNumber(existingPerson, newNumber);}
    else{
    personsService
    .create(nameObject)
    .then(newNameObject => {
      setPersons(persons.concat(newNameObject))
      setNewName('')
      setNewNumber('')
      setSuccessMessage(
        `Added ${newNameObject.name}`
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    })
    }
  }

  const contactsToShow = showAll 
  ? persons.filter(person => person.name.toUpperCase().indexOf(showAll.toUpperCase()) !== -1)
  : persons

  const deleteContact = (id, name) => {

    const confirmDeletion = window.confirm(`Delete ${name}?`);

    if (confirmDeletion) {
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          setErrorMessage(
            `${name} was remowed from the phonebook`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(
            `Person '${name}' was already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  return (
    <div>

      <h2>Phonebook</h2>
      
      <Filter showAll={showAll} handle={handleFilterResults}/>
      <h2>Add a new Contact</h2>
      {errorMessage && <div className="error">{errorMessage}</div>}
      {successMessage && <div className="success">{successMessage}</div>}
      <PersonForm 
      addName = {addName} 
      newName={newName} 
      handleName={handleNameChange} 
      newNumber={newNumber} 
      handleNumber={handleNumberChange}/>

      <h2>Numbers</h2>

      <Persons contacts = {contactsToShow} deleteCont = {deleteContact} />

    </div>
  )

}

const Person = (props) => {
   return(
      <p>{props.name} {props.number}</p>
   ) 
}

const Filter = ({showAll, handle}) => {
  return (
    <form>
        filter shown with <input value={showAll} onChange = {handle}/>
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

const Persons = ({ contacts, deleteCont }) => {
  return (
    <div>
      {contacts.map(person => (
        <div key={person.id}>
          <Person name={person.name} number={person.number} />
          <button onClick={() => deleteCont(person.id, person.name)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default App