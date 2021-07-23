import React from 'react'

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.name} {props.count}</p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.parts[0].name} count={props.parts[0].exercises} />
      <Part name={props.parts[1].name} count={props.parts[1].exercises} />
      <Part name={props.parts[2].name} count={props.parts[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  const countp1 = props.parts[0].exercises
  const countp2 = props.parts[1].exercises
  const countp3 = props.parts[2].exercises
  return (
    <p>Number of exercises {countp1 + countp2 + countp3}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App