import React from 'react'

const Person = ({ name, number, handleClick }) => {
  return (
    <div>
      {name} {number} <button onClick={() => handleClick(name)}>delete</button>
    </div>
  )
}

const Persons = ({ personsToShow, handleClick }) => {
  return (
    <div>
      {personsToShow.map(person =>
        <Person key={person.name} name={person.name} number={person.number} handleClick={handleClick}/>
      )}
    </div>
  )
}

export default Persons