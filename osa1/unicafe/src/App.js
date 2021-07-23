import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const calculateAll = () => {
    return props.good + props.neutral + props.bad
  }

  const calculateAverage = () => {
    if (calculateAll() === 0) {
      return 0;
    }
    return (1 * props.good + 0 * props.neutral + -1 * props.bad)/calculateAll()
  }

  const calculatePositive = () => {
    if (calculateAll() === 0) {
      return 0
    }
    return (props.good/calculateAll())*100
  }

  if (calculateAll() === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text='good' value={props.good}/>
          <StatisticLine text='neutral' value={props.neutral}/>
          <StatisticLine text='bad' value={props.bad}/>
          <StatisticLine text='all' value={calculateAll()}/>
          <StatisticLine text='average' value={calculateAverage()}/>
          <StatisticLine text='positive' value={calculatePositive().toString().concat(" %")}/>
        </tbody>
      </table>
      <p></p>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handleBadClick} text='bad'/>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App