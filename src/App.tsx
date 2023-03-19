import { useState } from 'react'
import './App.css'
import log from 'loglevel'
import LogRocket from 'logrocket';

// using logrocket
LogRocket.init('p6aia1/ui-logger');
LogRocket.identify("Bamlak K", {
  name: 'Bamlak K',
  email: 'bamlakk@gmail.com',
  phone: '123-456-7890',
});

/* 
  Network Errors
  JavaScript Errors 
  Rage Clicks
  Dead Clicks
  Frustrating Network Requests
*/
/* 
 User Monitoring 
    Monitor your users' sessions in real-time
    Replay their sessions to see what happened
    Understand your users' behavior
  Performance Monitoring 
    Identify and fix bugs faster
*/
log.setDefaultLevel("TRACE")

function App() {
  
  const [count, setCount] = useState(0)
  log.warn("UI - Logger: Warn")
  log.debug("UI - Logger: Debug")
  log.info("UI - Logger: Info")
  log.error("UI - Logger: Error")
  log.trace("UI - Logger: Trace")

  return (
    <div className="App">
      <h1 onClick={ () => setCount(count + 1)}> UI - Logger {count} </h1>
      <ul style={{ textAlign: 'left', color: '#aedaed' }}> <h4> Log Settings </h4>
        <li> log.setLevel("Debug", true) </li>
        <li> log.setDefaultLevel("TRACE") </li>
        <li> log.resetLevel() </li>
        <li> log.enableAll() </li>
        <li> log.disableAll() </li>
      </ul>
      <h4> Log State </h4>
        Uses the getLevel() method to display the current log level. Documentation for disableAll().
        <div>
          <h2> QUIC/http3 support </h2>
        </div>
      </div>
  )
}

export default App
