import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '041-1234512' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name:newName,
      number:newNumber
    }

    
    if (checkIfNameExists() == true) alert(`${newName} is already added to phonebook`)
    else{
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const checkIfNameExists = () => {
    let exists = false

    persons.forEach(individual=> { if (individual.name === newName ) exists = true}) 
    return exists
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
      <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Person key={person.name} name={person.name} number={person.number}/>)}
    </div>
  )

}

const Person = (props) => {
   return(
      <p>{props.name} {props.number}</p>
   ) 
}

export default App