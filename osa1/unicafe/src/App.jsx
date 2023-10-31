import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      {good + neutral + bad > 0 ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : (
        <p>No feedback given</p> )}

    </div>
  )
}


const Statistics = ({good, neutral , bad}) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all || 0;
  const positivePercentage = (good / all) * 100 || 0;

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>   
          <StatisticLine text="good"     value ={good} />
          <StatisticLine text="neutral"  value ={neutral} />
          <StatisticLine text="bad"      value ={bad} />
          <StatisticLine text="all"      value ={all} />
          <StatisticLine text="average"  value ={average} />
          <StatisticLine text="positive" value ={positivePercentage + "%"} />
         </tbody>
      </table>
    </div>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <th>
        {props.text}
      </th>
      <th>
        {props.value}
      </th>
    </tr>
  )
}

const Button = (props) => {
  return (
    <button onClick = {props.handleClick} > {props.text}  </button>
  )
}

export default App