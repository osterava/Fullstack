import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [showAll, setShowAll] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountries(response.data);
    })
  }, [])

  const countriesToShow = showAll
  ? countries.filter((country) =>
      country.name.common.toUpperCase().includes(showAll.toUpperCase())
    )
  : countries;

  const handleShowAllChange = (event) => {
    setShowAll(event.target.value)
  }

  const handleShow = (country) => {
    setShowAll(country.name.common);
  }

  return (
    <div>
      <form>
        <div>
          Find country <input value={showAll} onChange={handleShowAllChange} />
        </div>
      </form>
      <Countries countries={countriesToShow} handleShow={handleShow} />
    </div>
  )
}

const Countries = ({ countries, handleShow }) => {
  
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } 
  
  else if (countries.length > 1 && countries.length < 10) {
    return countries.map((country) => (
      <div key={country.cca2}>
        <p>{country.name.common}</p>
        <button onClick={() => handleShow(country)}>Show</button>
      </div>
    ))
  } 
  
  else if (countries.length === 1) {
    const country = countries[0];
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h3>Languages</h3>
        <ul>
          {Object.values(country.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <img
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
          style={{ width: '150px', height: 'auto' }}
        />
      </div>
    )
  } 
  
  else {
    return <p>No matching countries found</p>;
  }
}

export default App;
