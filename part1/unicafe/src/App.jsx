import { useState } from 'react'

const Statistics = ({good,neutral,bad,total}) => {

  if (total === 0) return <p>No Feedback given</p>
  
  const average = (good - bad) / total
  const positive = good / total
  return (
    <>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>average {average}</p>
      <p>positive {positive} %</p>
    </>

  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + bad + neutral

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='good'/>
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral'/>
      <Button handleClick={() => setBad(bad + 1)} text='bad'/>
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} total={total}
      />
    </div>
  )
}

export default App
