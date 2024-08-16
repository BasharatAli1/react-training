import { Fragment } from 'react'
import './App.css'
import Hero from './components/Hero'
import NavBar from './components/NavBar'

function App() {

  return (
    <div className="container">
      <NavBar />  
      <Hero />  
    </div>
  )
}

export default App
