// import { useState } from 'react'
import './App.css'

/* components */
import Header from './components/Header'
// import Modal from './components/Modal'



function App() {
  // const [count, setCount] = useState(0)

  return (
      <>
        <div>
          <Header />
        </div>
        <div className="front-page-container">
          <h1 className="front-page-title">You Craft Your Story. ScriptHero Does The Rest.</h1>
          <h2 className="front-page-subtitle">ScriptHero is perfect tool to write perfectly formatted, Western-style comic books.</h2>
          <p><img src="https://picsum.photos/id/1/800/600" alt={"placeholder for main page hero image"} /></p>
          <h3 className="front-page-body">Placeholder for LOGIN big button</h3>
          <h3 className="front-page-body">Placeholder for REGISTER big button</h3>
        </div>

      </>
  )
}

export default App
