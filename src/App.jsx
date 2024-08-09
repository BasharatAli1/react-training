import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Profile from './components/profile.func'

function App() {

    const person = {
        name:'Basharat Ali',
        qualification:'Bs. I.T',
        university:'University of the Punjab',
        designation:'Software Engineer',
        skills: 'NodeJS, ReactJS, MySQL'
    }
  return (
    <>
        <Profile person={person}></Profile>
    </>
  )
}

export default App
