import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import log from 'loglevel'

function App() {
  const [count, setCount] = useState(0)
  log.warn("UI - Logger")
  return (
    <div className="App">
      <h1 onClick={ () => setCount(count + 1)}> UI - Logger {count} </h1>
      <ul> <h4> Log Settings </h4>
        <li> log.setLevel("Debug", true) </li>
        <li> log.setDefaultLevel("TRACE") </li>
        <li> log.resetLevel() </li>
        <li> log.enableAll() </li>
        <li> log.disableAll() </li>
      </ul>
    </div>
  )
}

export default App
