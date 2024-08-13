import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ChildFunc from './components/child.func'
import ChildClass from './components/child.class'

function App() {
	const [count, setCount] = useState(0);
	const increment = () => {
		setCount(count + 1);
	}
  return (
    <>
        <ChildFunc count={count}></ChildFunc>
        <ChildClass count={count}></ChildClass>
    </>
  )
}

export default App
