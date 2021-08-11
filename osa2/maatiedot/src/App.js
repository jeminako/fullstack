import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Search = ({ filter, handleChange }) => {
  return (
    <div>
      find countries <input value={filter} onChange={handleChange}/>
    </div>
  )
}

const CountryInfo = ({ country }) => {
  console.log()
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map(language =>
            <li key={language.name}>{language.name}</li>
          )}
      </ul>
      <img src={country.flag} alt='Flag' width='130px'/>
    </div>
  )
}

const Countries = ({ countriesToShow, filter, handleClick }) => {
  
  if (filter === '') {
    return (
      <div></div>
    )
  }

  if (countriesToShow.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }

  if (countriesToShow.length > 1) {
    return (
      <div>
        {countriesToShow.map(country => 
            <div key={country.name}>
              {country.name} <button onClick={() => handleClick(country.name)} id={country.name}>show</button>
            </div>
        )}
      </div>
    )
  }

  if (countriesToShow.length === 1) {
    return (
      <CountryInfo country={countriesToShow[0]}/>
    )
  }

  return (
    <div>No results</div>
  )

}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')
  const [ countriesToShow, setCountriesToShow ] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data)
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    const newFilter = event.target.value
    setFilter(newFilter)
    const searchedCountries = countries.filter(country => 
      country.name.toLowerCase().includes(newFilter.toLowerCase())
    )
    setCountriesToShow(searchedCountries)
  }

  const handleButtonClick = (name) => {
    console.log(name)
    const country = countriesToShow.filter(country =>
      country.name === name  
    )
    console.log(country)
    setCountriesToShow(country)
  }

  return (
    <div>
      <h1>Countries</h1>
      <Search filter={filter} handleChange={handleFilterChange}/>
      <Countries countriesToShow={countriesToShow} filter={filter} handleClick={handleButtonClick}/>
    </div>
  )
}

export default App;
