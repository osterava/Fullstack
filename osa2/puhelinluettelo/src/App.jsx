import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Contacts from './components/Contacts'
import ContactForm from './components/ContactForm'
import Filter from './components/Filter'
import Notification from './components/Notification'


const App = () => {
  const [contacts, setContacts] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredContacts, setFilteredContacts] = useState(contacts)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState()

  const getAllContacts = () => {
    personService
      .getAll()
      .then(initialContacts => {
        setContacts(initialContacts)
        setFilteredContacts(initialContacts)
        setNewName('')
        setNewNumber('')
      }).catch(error => {
        setMessageType('error')
        setMessage('Error: couldn\'t retrieve phonenbook', error)
      })
  }

  const messageToScreen = (type, action, name) => {
    if (type === 'success') {
      setMessageType('success')
      switch (action) {
        case 'add':
          setMessage(`Added ${name}`)
          break;
        case 'update':
          setMessage(`Updated ${name}'s number`)
          break;
        case 'delete':
          setMessage(`Deleted ${name}`)
          break;
        default:
      }
    } else {
      setMessageType('error')
      setMessage(`Error: Person validation failed: ${name} is shorter than the minimun allowed length`)
    }
    setTimeout(() => {
      setMessage(null)
      setMessageType(null)
    }, 5000)
  }

  useEffect(() => {
    getAllContacts()
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const lastId = contacts[contacts.length - 1].id
    const contact = contacts.find(contact => contact.name === newName)


    if (contact !== undefined) {
      if (window.confirm(`Contact ${newName} exists already,
       replace the old number with a new one?`)) {
        personService
          .update(contact.id, { name: newName, number: newNumber, id: contact.id })
          .then(() => {
            getAllContacts()
            setNewName('')
            setNewNumber('')
            messageToScreen('success', 'update', newName)
          })
          .catch(error => {
            messageToScreen('error', 'update', newName)
            getAllContacts()
          })
      }
    } else {
      personService
        .create({ name: newName, number: newNumber, id: lastId + 1 })
        .then(returnedContact => {
          const arr = contacts.concat(returnedContact)
          setContacts(arr)
          setFilteredContacts(arr)
          setNewName('')
          setNewNumber('')
          messageToScreen('success', 'add', newName)
        })
        .catch(error => {
          messageToScreen('error', 'add', newName)
          getAllContacts()
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const filterChange = (filter) => {
    setFilteredContacts(contacts.filter(contact => contact.name.toUpperCase()
      .indexOf(filter.toUpperCase()) > -1))
  }

  const filterContacts = (event) => {
    filterChange(event.target.value)
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          personService
            .getAll()
            .then(contacts => {
              const arr = contacts
              setContacts(arr)
              setFilteredContacts(arr)
              messageToScreen('success', 'delete', name)
            })
        })
        .catch(error => {
          notify('error', 'delete', name)
          getAllContacts()
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} type={messageType} />
      <Filter filterContacts={filterContacts} />
      <h2>Add a new contact</h2>
      <ContactForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange} />
      <h2>Contacts</h2>
      <Contacts contacts={filteredContacts} handleDelete={handleDelete} />
    </div>
  )
}

export default App