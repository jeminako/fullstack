import React from 'react'

const Header = ({ course }) => {
  return (
    <h2>{course}</h2>
  )
}

const Part = ({ name, count }) => {
  return (
    <p>{name} {count}</p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => 
        <Part key={part.id} name={part.name} count={part.exercises} />
      )}
    </div>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce( (sum, part) => sum + part.exercises, 0)
  return (
    <p style={{fontWeight: 'bolder'}}>total of exercises {total}</p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course