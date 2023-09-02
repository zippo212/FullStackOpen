import { useState } from 'react'

const StatisticLine = ({text,value}) => {
  return (
    <tr>
      <th>{text}</th>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good,neutral,bad,total}) => {

  if (total === 0) return <p>No Feedback given</p>
  
  const average = (good - bad) / total
  const positive = good / total
  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={total} />
        <StatisticLine text='average' value={average}/>
        <StatisticLine text='positive' value={`${positive} %`}/>
      </tbody>
    </table>

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
