import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  //const [count, setCount] = useState(0)
  const [items, setItems] = useState([])

  return (
    <div className="lists-container">
      <div className="list">
        <p>
          <strong>LIST 1</strong>
        </p>
      </div>
      <div className="list">
        <p>
          <strong>LIST 2</strong>
        </p>
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
      </div>
      <div className="list">
        <p>
          <strong>LIST 3</strong>
        </p>
      </div>
    </div>
  )
}

export default App
